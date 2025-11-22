const passport = require("passport");
const db = require("../db/queries");
const { validationResult, matchedData } = require("express-validator");

async function allMessagesGet(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth");
  }
  const messages = await db.getAllMessages();
  res.render("index", {
    messages: messages,
    title: "Mini Message Board",
    user: req.user,
  });
}

async function addNewMessagePost(req, res, next) {
  const repliedMessageId = req.query.replyId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("form", { errors: errors.array() });
  }
  try {
    const { message } = matchedData(req);
    await db.insertMessage(req.user.username, message, repliedMessageId);
    res.redirect("/");
  } catch (err) {
    console.error("Failed to insert message:", err);
    return next(err);
  }
}

async function replyToMessageGet(req, res, next) {
  try {
    const repliedMessage = await db.getMessage(req.params.messageId);
    res.render("reply", { message: repliedMessage });
  } catch (error) {
    return next(error);
  }
}

async function messagesByQueryGet(req, res) {
  const query = req.query.query;
  const messages = await db.searchMessages(query);
  res.render("search", { messages: messages, title: "Results" });
}

function authenticationGet(req, res) {
  res.render("authentication");
}

module.exports = {
  addNewMessagePost,
  allMessagesGet,
  messagesByQueryGet,
  replyToMessageGet,
  authenticationGet,
};
