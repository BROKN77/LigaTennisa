const express = require('express');
   const mysql = require('mysql2');
   const cors = require('cors');
   const bodyParser = require('body-parser');

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
     const { username, email, password } = req.body;
     const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
     
     db.query(query, [username, email, password], (err, results) => {
       if (err) {
         console.error('Error registering user:', err);
         return res.status(500).json({ message: 'Error registering user', error: err });
       }
       res.status(201).json({ message: 'User registered successfully' });
     });
   });

   app.listen(PORT, () => {
     console.log('Server is running on port ', PORT);
   });