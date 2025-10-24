const db = require("../db/queries");
const { validationResult, matchedData } = require("express-validator");

async function allMessagesGet(req, res) {
  const messages = await db.getAllMessages();
  res.render("index", { messages: messages, title: "Mini Message Board" });
}

async function addNewMessagePost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("form", { errors: errors.array() });
  }
  try {
    const { message, user } = matchedData(req);
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
