const express = require("express");
const db = require("../db");
const { addNewMessage } = require("../contollers/addMessage");
const indexRouter = express.Router();

indexRouter.use(express.urlencoded({ extended: true }));

indexRouter.get("/", (req, res) => {
  res.render("index", { messages: db.messages, title: "Mini Message Board" });
});

indexRouter.get("/new", (req, res) => {
  res.render("form");
});

indexRouter.post("/new", addNewMessage);

module.exports = indexRouter;
