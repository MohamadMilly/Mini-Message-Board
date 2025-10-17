const db = require("../db");

async function addNewMessage(req, res) {
  const { message, user } = req.body;

  await db.addNewMessage(user, message);

  res.redirect("/");
}

module.exports = { addNewMessage };
