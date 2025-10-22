const db = require("../db/queries");
async function addNewMessage(req, res) {
  const { message, user } = req.body;
  try {
    await db.insertMessage(user, message);
    res.redirect("/");
  } catch (err) {
    console.error("Failed to insert message:", err);
  }
}

module.exports = { addNewMessage };
