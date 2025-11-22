const express = require("express");
const db = require("../db/queries");
const indexController = require("../contollers/indexController");
const { body } = require("express-validator");
const passport = require("passport");

const emptyUserError = "Name should not be empty";
const notAlphaUserError = "Name should only contain letters";
const emptyMessageError = "Message should not be empty";

const validateMessage = [
  body("message").trim().notEmpty().withMessage(emptyMessageError),
];

const indexRouter = express.Router();

indexRouter.get("/", indexController.allMessagesGet);

indexRouter.get("/auth", indexController.authenticationGet);

indexRouter.post(
  "/auth",
  passport.authenticate("local", {
    successRedirect: "/",
  })
);

indexRouter.get("/reply/:messageId", indexController.replyToMessageGet);

indexRouter.post("/new", validateMessage, indexController.addNewMessagePost);

indexRouter.get("/search", indexController.messagesByQueryGet);

module.exports = indexRouter;
