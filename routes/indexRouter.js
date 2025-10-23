const express = require("express");
const db = require("../db/queries");
const { addNewMessage } = require("../contollers/addMessage");
const { getAllMessages } = require("../contollers/getMessages");
const { getMessagesByQuery } = require("../contollers/searchMessages");

const indexRouter = express.Router();

indexRouter.get("/", getAllMessages);

indexRouter.get("/new", (req, res) => {
  res.render("form");
});

indexRouter.post("/new", addNewMessage);

indexRouter.get("/search", getMessagesByQuery);

module.exports = indexRouter;
