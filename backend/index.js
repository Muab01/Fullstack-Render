
const dotenv = require('dotenv')

const express = require('express')
const { Client } = require('pg')
const path = require('path')

dotenv.config()


const app = express();
const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'dist')));


app.get('/api/quotes', async (req, res) => {
  
  const client = new Client({
    connectionString: process.env.PGURI,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    const result = await client.query('SELECT * FROM quotes');
    res.json(result.rows)
  } catch (error) {
    console.error('Skedde ett fel vvid hämtning av citat:');
    res.status(500).send('Serverfel!!')
  } finally {
    await client.end()
  }
})


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})


app.listen(port, () => {
  console.log(`Servern körs på port ${port}`);
})