const db = require("../db/queries");

exports.getMessagesByQuery = async (req, res) => {
  const query = req.query.query;
  const messages = await db.searchMessages(query);
  res.render("search", { messages: messages, title: "Results" });
};
