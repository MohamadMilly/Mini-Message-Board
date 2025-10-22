const express = require("express");
const { getMessage } = require("../contollers/getMessage");

const messageRouter = express.Router();

messageRouter.get("/:messageId", getMessage);

module.exports = messageRouter;
