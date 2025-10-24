const express = require("express");
const db = require("../db/queries");
const indexController = require("../contollers/indexController");
const { body } = require("express-validator");

const emptyUserError = "Name should not be empty";
const notAlphaUserError = "Name should only contain letters";
const emptyMessageError = "Message should not be empty";

const validateMessage = [
  body("user")
    .trim()
    .notEmpty()
    .withMessage(emptyUserError)
    .isAlpha()
    .withMessage(notAlphaUserError),
  body("message").trim().notEmpty().withMessage(emptyMessageError),
];

const indexRouter = express.Router();

indexRouter.get("/", indexController.allMessagesGet);

indexRouter.get("/new", indexController.addNewMessageGet);

indexRouter.post("/new", validateMessage, indexController.addNewMessagePost);

indexRouter.get("/search", indexController.messagesByQueryGet);

module.exports = indexRouter;
