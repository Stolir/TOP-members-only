const { body, validationResult, matchedData } = require("express-validator");
const {
  findHashByRoleName,
  changeRolePassword,
} = require("../models/accountStatusPasswordsModel");
const {
  validatePassword,
  generateHashedPassword,
} = require("../lib/passwordUtils");

const validateData = [
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be between 8-128 characters"),
  body("adminPassword").notEmpty().withMessage("Admin Password is required"),
];

function getAdminDashboard(req, res) {
  res.render("adminDashboard", { title: "Admin Dashboard" });
}

function getAdminSetClubPass(req, res) {
  res.render("adminSetPass", {
    title: "Set new club password",
    postRoute: "set-club-password",
    errors: {},
  });
}

const postAdminSetClubPass = [
  validateData,
  async (req, res, next) => {
    const errorsMap = {};
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => (errorsMap[error.path] = error.msg));
      return res.render("adminSetPass", {
        title: "Set new club password",
        postRoute: "set-club-password",
        errors: errorsMap,
      });
    }
    try {
      const data = matchedData(req);
      const adminHash = await findHashByRoleName("admin");
      if (!adminHash) {
        throw new Error("Admin password not found");
      }
      const isValid = validatePassword(data.adminPassword, adminHash);
      if (isValid) {
        const newHash = generateHashedPassword(data.password);
        await changeRolePassword("club_member", newHash);
        res.send(
          '<h1>Changed club password successfully</h1> <a href="/admin/dashboard">Return to dashboard</a>',
        );
      } else {
        errorsMap.adminPassword = "Invalid admin password";
        return res.render("adminSetPass", {
          title: "Set new club password",
          postRoute: "set-club-password",
          errors: errorsMap,
        });
      }
    } catch (err) {
      next(err);
    }
  },
];

function getAdminSetAdminPass(req, res) {
  res.render("adminSetPass", {
    title: "Set new admin password",
    postRoute: "set-admin-password",
    errors: {},
  });
}

const postAdminSetAdminPass = [
  validateData,
  async (req, res, next) => {
    const errorsMap = {};
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => (errorsMap[error.path] = error.msg));
      return res.render("adminSetPass", {
        title: "Set new admin password",
        postRoute: "set-admin-password",
        errors: errorsMap,
      });
    }
    try {
      const data = matchedData(req);
      const adminHash = await findHashByRoleName("admin");
      if (!adminHash) {
        throw new Error("Admin password not found");
      }
      const isValid = validatePassword(data.adminPassword, adminHash);
      if (isValid) {
        const newHash = generateHashedPassword(data.password);
        await changeRolePassword("admin", newHash);
        res.send(
          '<h1>Changed admin password successfully</h1> <a href="/admin/dashboard">Return to dashboard</a>',
        );
      } else {
        errorsMap.adminPassword = "Invalid admin password";
        return res.render("adminSetPass", {
          title: "Set new admin password",
          postRoute: "set-admin-password",
          errors: errorsMap,
        });
      }
    } catch (err) {
      next(err);
    }
  },
];

module.exports = {
  getAdminDashboard,
  getAdminSetClubPass,
  postAdminSetClubPass,
  getAdminSetAdminPass,
  postAdminSetAdminPass,
};
