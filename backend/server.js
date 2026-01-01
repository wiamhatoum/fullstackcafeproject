const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.get('/', (req, res) => res.json("Backend is running"));

// Parse Railway public URL
const dbConfig = new URL(process.env.MYSQL_PUBLIC_URL);

const db = mysql.createPool({
  connectionLimit: 10,
  host: dbConfig.hostname,
  user: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.pathname.replace('/', ''),
  port: dbConfig.port
});

// Test DB connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database!");
    connection.release();
  }
});

// Test route
app.get('/test-db', (req, res) => {
  db.query('SELECT 1 + 1 AS result', (err, data) => {
    if (err) return res.json({ success: false, error: err });
    res.json({ success: true, data });
  });
});

// Categories
app.get('/categories', (req, res) => {
  db.query('SELECT * FROM categories', (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
});

// Single category
app.get('/categories/onerecord/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM categories WHERE ID = ?', [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({ message: "Record not found" });
    res.json(data[0]);
  });
});

// Menu items
app.get('/menu_items', (req, res) => {
  const sql = `
    SELECT m.id, m.name, m.ingredients, m.price, m.image, m.category_id, c.name AS category_name
    FROM menu_items m
    INNER JOIN categories c ON m.category_id = c.id
  `;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
});

// Feedback
app.post("/feedback", (req, res) => {
  const { name, email, message } = req.body;
  const q = "INSERT INTO feedback(`name`,`email`,`message`) VALUES (?,?,?)";
  db.query(q, [name, email, message], (err, data) => {
    if (err) return res.send(err);
    res.json(data);
  });
});

const PORT = process.env.PORT || 8083;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
