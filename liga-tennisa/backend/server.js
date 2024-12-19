const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For creating tokens
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3008;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Настройка mysql соединения: хост, имя пользователя БД, пароль, БД и порт
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'admin', // MySQL username
  password: 'admin_515', // MySQL password
  database: 'db', // database name
  port: 3308 //port server
});



db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});


// Register User Route
app.post('/register', (req, res) => {
  const { username, email, password, skillLevel } = req.body;

  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ message: 'Error registering user', error: err });
    }

    // Determine skill level based on user input
    let skillLevelValue;
    switch (skillLevel) {
      case 'Новичок':
        skillLevelValue = 1; // or any value between 1-25
        break;
      case 'Любитель':
        skillLevelValue = 26; // or any value between 26-50
        break;
      case 'Профессионал':
        skillLevelValue = 51; // or any value between 51-75
        break;
      default:
        skillLevelValue = null; // In case of invalid input
    }

    const query = 'INSERT INTO users (username, email, password, skill_level, image) VALUES (?, ?, ?, ?, NULL)';
    
    db.query(query, [username, email, hash, skillLevelValue], (err, results) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ message: 'Error registering user', error: err });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// Login User Route
// Function to generate token
const SECRET_KEY = '56a94a8df31dd87781553787129b24d5fd01186392a5e10eb2cac0bc2ffbf4e41658543e81bfe43df922e6ea5078f1eceacadafc563072909e7d5407e73a347a30de780bc187c978add769f94e84f30d9175fbb8f291facbb602079a559a810120073602dedd9429ed1d03069476c1eb1c830e79de86db469d88ed133b13e94a45712a5d6d089fe001e0991ab9276e8f080e17633bc24986350802bfc4e3a1fc8a51c7e596e07804fdb1c62e1644a88b40e3ba795299b56100154fcb7dcec164837c7f46d2e3cd8302f810f9b84c10761da12c74c3c310cc1cf9e89bff6901e0ec9c7c28f812586216528fa20a92a8621ba268187ee31954843020c8bb3c5dea'; // Define your secret key

function generateToken(userId) {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
}
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ message: 'Error logging in', error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    // Compare the provided password with the hashed password in the database
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ message: 'Error logging in', error: err });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      
    const token = generateToken(user.id);
  // Respond with token and userId
      res.json({
        message: 'Login successful',
        token,
        id: user.id // Send userId back to the client
      });
    });
  });
});
//Загрузка изображений
const upload = multer();
app.post('/upload-image/:id', upload.single('image'), (req, res) => {
  //тут ошибка
  const userId = req.params.id; // Get userId from request body
  console.log('Get ID of: ', userId);
  //
  const image = req.file.buffer; // Get the image buffer

  console.log("Received userId:", userId); // Log userId
  console.log("Received image buffer length:", image ? image.length : 'No image'); // Log image buffer length

  // SQL query to update the user's image
  const sql = 'UPDATE users SET image = ? WHERE id = ?';
  
  db.query(sql, [image, userId], (error, results) => {
    if (error) {
      console.error('Error updating image:', error);
      return res.status(500).json({ error: 'Failed to upload image.' });
    }
    res.json({ message: 'Image uploaded successfully!' });
    
  });
});
//To load img in profile
app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT username, email, skill_level, image FROM users WHERE id = ?', [userId], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      const user = results[0];
      // Convert BLOB to base64 string for image display
      const imageBase64 = user.image ? Buffer.from(user.image).toString('base64') : null;
      res.json({ username: user.username, email: user.email, skill_level: user.skill_level, image: imageBase64 });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

// Endpoint to handle tournament application submissions
app.post('/submit-application', (req, res) => {
  const {
    phone,
    email,
    lastName,
    firstName,
    middleName,
    date,
    time,
    location,
    tournamentName,
    tournamentLevel,
    numOfPlayers,
  } = req.body;

  // SQL query to insert data into the database
  const sql = 'INSERT INTO events (phone, email, last_name, first_name, middle_name, date, time, location, tournament_name, tournament_level, numOfPlayers) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  // Execute the query
  db.query(sql, [phone, email, lastName, firstName, middleName, date, time, location, tournamentName, tournamentLevel, numOfPlayers], (error, results) => {
    if (error) {
      console.error('Error inserting data:', error);
      return res.status(500).json({ message: 'Ошибка при добавлении данных' });
    }
    res.status(201).json({ message: 'Заявка успешно отправлена!' });
  });
});

app.get('/api/events', (req, res) => {
  db.query('SELECT * FROM events', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/register-on-event', (req, res) => {
  const { eventId, playerId } = req.body;

  // Проверка наличия необходимых данных
  if (!eventId || !playerId) {
      return res.status(400).json({ error: 'Вы не вошли в личный аккаунт/Мероприятие недоступно' });
  }

  // Запрос на регистрацию
  const query = 'INSERT INTO event_registrations (event_id, player_id) VALUES (?, ?)';
  db.query(query, [eventId, playerId], (err, results) => {
      if (err) {
          console.error('Ошибка при регистрации:', err);
          return res.status(500).json({ error: 'Ошибка при регистрации' });
      }
      res.status(201).json({ message: 'Регистрация успешна', registrationId: results.insertId });
  });
});
// Маршрут для проверки регистрации пользователя на мероприятие
app.get('/registration-status', (req, res) => {
  const { eventId, playerId } = req.query;

  // Проверка наличия необходимых данных
  if (!eventId || !playerId) {
      return res.status(400).json({ error: 'eventId и playerId обязательны' });
  }

  // Запрос на проверку регистрации
  const query = 'SELECT * FROM event_registrations WHERE event_id = ? AND player_id = ?';
  db.query(query, [eventId, playerId], (err, results) => {
      if (err) {
          console.error('Ошибка при проверке регистрации:', err);
          return res.status(500).json({ error: 'Ошибка при проверке регистрации' });
      }
      // Если результаты есть, значит пользователь зарегистрирован
      const isRegistered = results.length > 0;
      res.json({ isRegistered });
  });
});

// Обновите код для отмены регистрации
app.delete('/unregister', (req, res) => {
  const { eventId, playerId } = req.body;

  // Проверка наличия необходимых данных
  if (!eventId || !playerId) {
      return res.status(400).json({ error: 'eventId и playerId обязательны' });
  }

  // Запрос на отмену регистрации
  const query = 'DELETE FROM event_registrations WHERE event_id = ? AND player_id = ?';
  db.query(query, [eventId, playerId], (err, results) => {
      if (err) {
          console.error('Ошибка при отмене регистрации:', err);
          return res.status(500).json({ error: 'Ошибка при отмене регистрации' });
      }
      res.json({ message: 'Вы успешно отказались от участия' });
  });
});

app.get('/event-info', (req, res) => {
  const { eventId } = req.query;

  // Проверка наличия необходимых данных
  if (!eventId) {
      return res.status(400).json({ error: 'eventId обязателен' });
  }

  // Запрос на получение информации о мероприятии
  const query =`
      SELECT e.numOfPlayers, COUNT(er.player_id) AS currentPlayers
      FROM events e
      LEFT JOIN event_registrations er ON e.id = er.event_id
      WHERE e.id = ?
      GROUP BY e.id`
  ;
  
  db.query(query, [eventId], (err, results) => {
      if (err) {
          console.error('Ошибка при получении информации о мероприятии:', err);
          return res.status(500).json({ error: 'Ошибка при получении информации о мероприятии' });
      }
      
      if (results.length === 0) {
          return res.status(404).json({ error: 'Мероприятие не найдено' });
      }

      const eventInfo = results[0];
      res.json({
          numOfPlayers: eventInfo.numOfPlayers,
          currentPlayers: eventInfo.currentPlayers || 0
      });
  });
});

app.post('/api/updateProfile', (req, res) => {
  const { id, username, email } = req.body;
  //const userId = req.body.userId; // Предполагается, что ID пользователя также передается

  if (!username || !email || !id) {
    return res.status(400).json({ message: 'Недостаточно данных для обновления профиля' });
  }

  const query = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
  db.query(query, [username, email, id], (err, res) => {
    if (err) {
      console.error('Ошибка при обновлении профиля:', err);
      return res.status(500).json({ message: 'Ошибка при обновлении профиля' });
    }

    res.status(200).json({ message: 'Профиль успешно обновлен' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
});
