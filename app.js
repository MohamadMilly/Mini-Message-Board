const express = require("express");
const path = require("path");
const indexRouter = require("./routes/indexRouter");
const messageRouter = require("./routes/messageRouter");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const pool = require("./db/pool");
const db = require("./db/queries");
const pgSession = require("connect-pg-simple")(session);
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, "/views");
app.set("view engine", "ejs");
app.set("views", viewsPath);

const assestsPath = path.join(__dirname, "/public");
app.use(express.static(assestsPath));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "users_sessions",
    }),
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30 * 12,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUser(username);

      if (user) {
        return done(null, user);
      }

      const result = await pool.query(
        "INSERT INTO users(username) VALUES($1) RETURNING *",
        [username]
      );

      const newUser = result.rows[0];
      return done(null, newUser);
    } catch (err) {
      console.log(err);
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use("/", indexRouter);
app.use("/messages", messageRouter);
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send(err.message || err.name);
  console.error(err);
});

app.listen(PORT, (error) => {
  console.error(error);
});

module.exports = app;
