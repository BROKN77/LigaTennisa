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
  const { username, email, password, image } = req.body;

  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ message: 'Error registering user', error: err });
    }

    const query = 'INSERT INTO users (username, email, password, image) VALUES (?, ?, ?, NULL)';
    
    db.query(query, [username, email, hash, image], (err, results) => {
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
  db.query('SELECT username, email, image FROM users WHERE id = ?', [userId], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      const user = results[0];
      // Convert BLOB to base64 string for image display
      const imageBase64 = user.image ? Buffer.from(user.image).toString('base64') : null;
      res.json({ username: user.username, email: user.email, image: imageBase64 });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
});