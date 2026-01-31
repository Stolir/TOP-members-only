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
  passport.authenticate("local", {
    failureRedirect: "login",
    failureMessage: true,
  }),
  postLoginSuccess,
);

module.exports = loginRouter;
