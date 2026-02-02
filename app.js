require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

require("./config/passport");

// Require express related
const express = require("express");
const path = require("node:path");

// Require auth related
const passport = require("passport");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const pool = require("./database/pool");

// Require Routes
const indexRouter = require("./routes/indexRouter");
const loginRouter = require("./routes/loginRouter");
const signupRouter = require("./routes/signupRouter");
const logoutRouter = require("./routes/logoutRouter");
const upgradeAccountRouter = require("./routes/upgradeAccountRouter");
const adminRouter = require("./routes/adminRouter");
const { isAdmin, isLoggedIn } = require("./middleware/authMiddleware");
const messagesRouter = require("./routes/messagesRouter");
const { userIsLoggedIn, userIsAdmin } = require("./lib/authHelpers");
const accountRouter = require("./routes/accountRouter");

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

// use custom middleware
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});
// Debugging -- DEV ONLY --
app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

// use routes
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/logout", logoutRouter);
app.use("/upgrade-account", isLoggedIn, upgradeAccountRouter);
app.use("/admin", isLoggedIn, isAdmin, adminRouter);
app.use("/messages", isLoggedIn, messagesRouter);
app.use("/account", isLoggedIn, accountRouter);

// Run app
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`App running on port ${PORT}`);
});
