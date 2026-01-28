require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

// Require express related
const express = require("express");
const path = require("node:path");

// Require auth related
const passport = require("passport");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const pool = require("./database/pool");

// Require Routes

// Define express related
const app = express();
const PORT = process.env.PORT || 3000;

// set views directory and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// use general middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// use session middleware
app.use(
  expressSession({
    store: new pgSession({ pool, createTableIfMissing: true }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1000ms * 60s * 60m * 24 hours = 1 day
  }),
);

app.use(passport.session());

// Debugging -- DEV ONLY --
app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

// use routes

// Run app
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`App running on ${PORT}`);
});
