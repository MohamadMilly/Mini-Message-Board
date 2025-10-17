const express = require("express");
const path = require("path");
const indexRouter = require("./routes/indexRouter");
const messageRouter = require("./routes/messageRouter");

const app = express();
const PORT = 3000;

const viewsPath = path.join(__dirname, "/views");
app.set("view engine", "ejs");
app.set("views", viewsPath);

const assestsPath = path.join(__dirname, "/public");
app.use(express.static(assestsPath));

app.use("/", indexRouter);
app.use("/messages", messageRouter);
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send(err.name || err.message);
});
app.listen(PORT, (error) => {
  console.error(error);
});
