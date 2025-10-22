const { Client } = require('pg');
require('dotenv').config();

async function test() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
  });

  try {
    console.log('connecting...');
    await client.connect();
    console.log('connected');
    const res = await client.query('SELECT NOW()');
    console.log('now:', res.rows[0]);
  } catch (err) {
    console.error('connection error:', err.code || err.message || err);
    console.error(err);
  } finally {
    try { await client.end(); } catch (e) {}
  }
}

test();
