const { body } = require("express-validator");
const { findUserByUsername } = require("../models/usersModel");

const validateUser = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .bail()
    .isLength({ max: 50 })
    .withMessage("First name must be under 50 characters")
    .bail()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/)
    .withMessage("First name contains invalid characters"),

  body("last_name")
    .trim()
    .optional({ values: "falsy" })
    .isLength({ max: 50 })
    .withMessage("Last name must be under 50 characters")
    .bail()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/)
    .withMessage("Last name contains invalid characters"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .bail()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .bail()
    .matches(/^[a-zA-Z0-9_-]{3,30}$/)
    .withMessage("Usernames can only contain letters, numbers, _, and -")
    .bail()
    .custom(async (username) => {
      const user = await findUserByUsername(username);
      if (user) {
        throw new Error("Username is not available");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be between 8-128 characters"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

function getSignupPage(req, res) {
  res.render("signup", { title: "Sign Up" });
}

module.exports = { getSignupPage };
