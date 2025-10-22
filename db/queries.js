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

module.exports = {
  getAllMessages,
  insertMessage,
  getMessage,
};
