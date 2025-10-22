const express = require("express");
const db = require("../db/queries");
const { addNewMessage } = require("../contollers/addMessage");
const { getAllMessages } = require("../contollers/getMessages");

const indexRouter = express.Router();

indexRouter.get("/", getAllMessages);

indexRouter.get("/new", (req, res) => {
  res.render("form");
});

indexRouter.post("/new", addNewMessage);

module.exports = indexRouter;
