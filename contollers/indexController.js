const db = require("../db/queries");

async function allMessagesGet(req, res) {
  const messages = await db.getAllMessages();
  res.render("index", { messages: messages, title: "Mini Message Board" });
}

async function addNewMessagePost(req, res) {
  const { message, user } = req.body;
  try {
    await db.insertMessage(user, message);
    res.redirect("/");
  } catch (err) {
    console.error("Failed to insert message:", err);
  }
}

function addNewMessageGet(req, res) {
  res.render("form");
}

async function messagesByQueryGet(req, res) {
  const query = req.query.query;
  const messages = await db.searchMessages(query);
  res.render("search", { messages: messages, title: "Results" });
}

module.exports = {
  addNewMessagePost,
  allMessagesGet,
  messagesByQueryGet,
  addNewMessageGet,
};
