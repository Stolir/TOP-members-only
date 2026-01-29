const passport = require("passport");
const { findUserByUsername } = require("../models/usersModel");
const { validatePassword } = require("../lib/passwordUtils");
const LocalStrategy = require("passport-local").Strategy;

const verifyCallback = async (username, password, done) => {
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return done(null, false);
    }

    const isValid = validatePassword(password, user.password_hash);
    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    done(err);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);
