const db = require("../db/queries");

exports.getAllMessages = async (req, res) => {
  const messages = await db.getAllMessages();
  res.render("index", { messages: messages, title: "Mini Message Board" });
};
