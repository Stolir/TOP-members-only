const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const verifyCallback = (username, password, done) => {
  try {
  } catch (err) {}
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);
