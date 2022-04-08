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


app.listen(3000, () => {
  console.log('Application started on port 3000!');
});


app.get('/products', async (req, res) => {

    let conn;
    try {
      conn = await pool.getConnection();
      const response = await conn.query("SELECT * FROM products");
      return res.status(200).send(JSON.stringify(response));
    } finally {
      if (conn) conn.release();
    }
});

app.get('/products/:id', async (req, res) => {

  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(`SELECT * FROM products WHERE id = ${req.params.id}`);
    return res.status(200).send(JSON.stringify(response));
  } finally {
    if (conn) conn.release();
  }
});


app.post('/products', async (req, res) => {

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      `
      INSERT INTO products (name, description) 
      VALUES ('${req.body.name}', '${req.body.description}')
      `);
    return res.status(200).send({ message: 'Successfully added product' });
  } finally {
    if (conn) conn.release();
  }
});


app.delete('/products/:id', async (req, res) => {

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      `
      DELETE FROM products
      WHERE id = ${req.params.id}
      `);

    const response = await conn.query("SELECT * FROM products");
    return res.status(200).send(JSON.stringify(response));
  } finally {
    if (conn) conn.release();
  }

});


app.put('/products/:id', async (req, res) => {

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      `
      UPDATE products SET 
      name = '${req.body.name}', 
      description = '${req.body.description}'
      WHERE id = ${req.params.id}
      `);
    const response = await conn.query("SELECT * FROM products");
    return res.status(200).send(JSON.stringify(response));
  } finally {
    if (conn) conn.release();
  }

});