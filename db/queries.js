const pool = require("./pool");
const formatFullDateTime = require("../utility");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function insertMessage(user, message) {
  await pool.query(
    `INSERT INTO messages ("user",content,added) VALUES ($1 , $2 , $3)`,
    [user, message, formatFullDateTime()]
  );
}

async function getMessage(id) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    id,
  ]);
  return rows[0];
}

async function searchMessages(query) {
  const { rows } = await pool.query(
    "SELECT * FROM messages WHERE content ILIKE $1 OR user ILIKE $1",
    [`%${query}%`]
  );
  return rows;
}

module.exports = {
  getAllMessages,
  insertMessage,
  getMessage,
  searchMessages,
};
