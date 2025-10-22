const express = require("express");
const path = require("path");
const indexRouter = require("./routes/indexRouter");
const messageRouter = require("./routes/messageRouter");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, "/views");
app.set("view engine", "ejs");
app.set("views", viewsPath);

const assestsPath = path.join(__dirname, "/public");
app.use(express.static(assestsPath));
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/messages", messageRouter);
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send(err.message || err.name);
});
app.listen(PORT, (error) => {
  console.error(error);
});

module.exports = app;
