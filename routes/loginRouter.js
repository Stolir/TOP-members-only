const { Router } = require("express");
const {
  getLoginPage,
  postLoginSuccess,
} = require("../controllers/loginController");
const passport = require("passport");

const loginRouter = Router();

loginRouter.get("/", getLoginPage);
loginRouter.post(
  "/",
  (req, res, next) => {
    req.redirectTo = req.session.redirectUrl ?? null;
    delete req.session.redirect;
    next();
  },
  passport.authenticate("local", {
    failureRedirect: "login",
    failureMessage: true,
  }),
  postLoginSuccess,
);

module.exports = loginRouter;
