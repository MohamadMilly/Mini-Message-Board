const express = require("express");
const messagesController = require("../contollers/messagesController");
const messageRouter = express.Router();

messageRouter.get("/:messageId", messagesController.getMessage);

module.exports = messageRouter;
