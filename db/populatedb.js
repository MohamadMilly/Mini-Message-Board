const { Client } = require("pg");
const formatFullDateTime = require("../utility");
require("dotenv").config();

const dbarg = process.argv[2];
const DATABASE_URL = dbarg || process.env.DATABASE_URL;
const SSL = dbarg ? null : { ssl: { rejectUnauthorized: false } };

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
    connectionString: DATABASE_URL,
    ...SSL,
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
