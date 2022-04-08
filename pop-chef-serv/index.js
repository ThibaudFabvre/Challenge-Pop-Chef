import express from 'express';
import cors from 'cors';
import mariadb from 'mariadb';
import bodyParser from 'body-parser';

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ShadowDemon123!',
    database: 'pop chef',
    connectionLimit: 5
});
const app = express();
app.use(cors());
app.use(bodyParser.json());



app.get('/products', async (req, res) => {

    let conn;
    try {
      conn = await pool.getConnection();
      const response = await conn.query("SELECT * FROM products");
      return res.status(200).send(JSON.stringify(response));
    } finally {
      if (conn) conn.release(); //release to pool
    }
});


app.post('/products', async (req, res) => {

  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `
      INSERT INTO products (name, description) 
      VALUES ('${req.body.name}', '${req.body.description}')
      `);
    return res.status(200).send({ message: 'Successfully added product' });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

app.listen(3000, () => {
  console.log('Application started on port 3000!');
});

