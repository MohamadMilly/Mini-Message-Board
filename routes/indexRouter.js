const express = require("express");
const db = require("../db/queries");
const indexController = require("../contollers/indexController");

const indexRouter = express.Router();

indexRouter.get("/", indexController.allMessagesGet);

indexRouter.get("/new", indexController.addNewMessageGet);

indexRouter.post("/new", indexController.addNewMessagePost);

indexRouter.get("/search", indexController.messagesByQueryGet);

module.exports = indexRouter;
