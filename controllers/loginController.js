const { body } = require("express-validator");

const validateUserLogin = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .bail()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be between 8 and 128 characters"),
];

function getLoginPage(req, res) {
  const data = {};
  const errors = req.session.messages ?? [];
  delete req.session.messages;

  if (req.session.username) {
    data.username = req.session.username;
    delete req.session.username;
  }
  res.render("login", { title: "Login", data, errors });
}

function postLoginSuccess(req, res) {
  res.send("<h1>You are logged in!</h1>");
}

module.exports = { getLoginPage, postLoginSuccess };
