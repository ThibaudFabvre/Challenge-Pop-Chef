import express from 'express';
import cors from 'cors';
import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ShadowDemon123!',
    database: 'pop chef',
    connectionLimit: 5
});
const app = express();
app.use(cors());

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

app.listen(3000, () => {
  console.log('Application started on port 3000!');
});

