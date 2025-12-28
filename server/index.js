const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
// NOTE: You need to create a database named 'pantau_desa' in your MySQL server
// and update the user/password below to match your local setup.
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Default XAMPP/MySQL user
  password: '',      // Default XAMPP/MySQL password (usually empty)
  database: 'pantau_desa'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    console.log('Make sure XAMPP/MySQL is running and the database "pantau_desa" exists.');
    return;
  }
  console.log('Connected to MySQL database');
  
  // Create table if not exists
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS reports (
      id INT AUTO_INCREMENT PRIMARY KEY,
      category VARCHAR(50) NOT NULL,
      description TEXT NOT NULL,
      location VARCHAR(255) NOT NULL,
      image_path VARCHAR(255),
      status VARCHAR(20) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  db.query(createTableQuery, (err) => {
    if (err) console.error('Error creating table:', err);
    else console.log('Reports table ready');
  });
});

// File Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// API Routes

// 1. Submit a Report
app.post('/api/reports', upload.single('image'), (req, res) => {
  const { category, description, location } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  const query = 'INSERT INTO reports (category, description, location, image_path) VALUES (?, ?, ?, ?)';
  
  db.query(query, [category, description, location, imagePath], (err, result) => {
    if (err) {
      console.error('Error saving report:', err);
      return res.status(500).json({ error: 'Failed to save report' });
    }
    res.status(201).json({ 
      message: 'Report submitted successfully', 
      reportId: result.insertId 
    });
  });
});

// 2. Get All Reports
app.get('/api/reports', (req, res) => {
  const query = 'SELECT * FROM reports ORDER BY created_at DESC';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching reports:', err);
      return res.status(500).json({ error: 'Failed to fetch reports' });
    }
    res.json(results);
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
