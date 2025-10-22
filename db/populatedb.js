const { Client } = require("pg");
const formatFullDateTime = require("../utility");
require("dotenv").config();

const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "user" VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    added TEXT
  );
`;

const INSERT_SQL = `
  INSERT INTO messages ("user",content,added)
  VALUES ($1, $2, $3);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    port: 5432,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  await client.query(CREATE_TABLE_SQL);
  await client.query(INSERT_SQL, [
    "Mohammed Milly",
    "Hello! ,  Try out the new version with non-auto deleted messages",
    formatFullDateTime(),
  ]);
  await client.end();
  console.log("done");
}

main();
