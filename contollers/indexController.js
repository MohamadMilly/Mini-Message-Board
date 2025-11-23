const passport = require("passport");
const db = require("../db/queries");
const { validationResult, matchedData } = require("express-validator");

async function allMessagesGet(req, res) {
  const currentRepliedMessageId = req.query.reply;
  const repliedMessageData = await db.getMessage(currentRepliedMessageId);
  if (!req.isAuthenticated()) {
    return res.redirect("/auth");
  }
  const messages = await db.getAllMessages();
  const errors = req.flash("errors");
  res.render("index", {
    messages: messages,
    title: "Mini Message Board",
    user: req.user,
    errors: errors,
    currentRepliedMessage: repliedMessageData,
  });
}

async function addNewMessagePost(req, res, next) {
  const repliedMessageId = req.query.reply ? req.query.reply : null;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array());
    return res.redirect("/");
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
