const pool = require("./pool");
const formatFullDateTime = require("../utility");

async function getAllMessages() {
  const { rows } = await pool.query(
    `SELECT m1.id,
    m1.user,
    m1.added,
    m1.content,
     m2.id AS repliedMessageId,
    m2.user AS repliedMessageUser,
    m2.content AS repliedMessageContent
    FROM messages AS m1
    LEFT JOIN messages AS m2 
    ON m1.replytoid = m2.id
    ORDER BY m1.added
    ;`
  );
  return rows;
}

async function insertMessage(user, message, repliedMessageId = null) {
  await pool.query(
    `INSERT INTO messages ("user",content,added,replytoid) VALUES ($1 , $2 , $3, $4)`,
    [user, message, formatFullDateTime(), repliedMessageId]
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
    'SELECT * FROM messages WHERE content ILIKE $1 OR "user" ILIKE $1',
    [`%${query}%`]
  );
  return rows;
}

async function getUser(username) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username = $1 ",
    [username]
  );
  return rows[0];
}

module.exports = {
  getAllMessages,
  insertMessage,
  getMessage,
  searchMessages,
  getUser,
};
