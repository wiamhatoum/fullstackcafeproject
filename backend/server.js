const express = require('express'); 
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static(__dirname + '/public/images'));
app.get('/', (req, res) => {
  return  res.json("Backend is running");
});

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  })  ;

db.connect((err) => {
  if (err) {
    console.log("Database connection error:", err);
  } else {
    console.log("Connected to MySQL database!");
  }
});
app.get('/test-db', (req, res) => {
  db.query('SELECT 1 + 1 AS result', (err, data) => {
    if (err) return res.json({ success: false, error: err });
    res.json({ success: true, data });
  });
});

app.get('/categories', (req, res) => {
  console.log("GET / categories hit");
  const sql = "SELECT * FROM categories";
  db.query(sql, (err, data) => {
    if (err){
      console.log("db error:", err)
       return res.json(err);
    }
    console.log("db data returned:", data)
    return res.json(data);
  });
});
// create API to get one single student record 
  app.get('/categories/onerecord/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM categories WHERE ID = ?";
    
    db.query(sql, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json({ message: "Record not found" });
      res.json(data[0]);
    });
  });

app.get('/menu_items', (req, res) => {
  const sql = ` SELECT m.id, m.name, m.ingredients, m.price, m.image, m.category_id, c.name AS category_name
    FROM menu_items m
    INNER JOIN categories c ON m.category_id = c.id`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});


app.post("/feedback",  (req, res) => {
   const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const q = "INSERT INTO feedback(`name`, `email`, `message`) VALUES (?,?,?)";
    db.query(q, [name,email,message], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});



const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



console.log("Before listen");
