const { Pool } = require("pg");
require("dotenv").config();
const dbarg = process.argv[2];

const DATABASE_URL = dbarg || process.env.DATABASE_URL;
const SSL = dbarg ? null : { ssl: { rejectUnauthorized: false } };

module.exports = new Pool({
  connectionString: DATABASE_URL,
  ...SSL,
});
