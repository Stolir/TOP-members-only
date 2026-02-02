const { body, validationResult, matchedData } = require("express-validator");
const { userIsAdmin } = require("../lib/authHelpers");
const { validatePassword } = require("../lib/passwordUtils");
const { findHashByRoleName } = require("../models/accountStatusPasswordsModel");
const { setUserRole, setUserAdminStatus } = require("../models/usersModel");

const validateData = [
  body("adminPassword").notEmpty().withMessage("Admin Password is required"),
];

function getUpgradeAccountPage(req, res) {
  res.render("upgradeAccount", { title: "Upgrade Account" });
}

function getUpgradeToAdminPage(req, res, next) {
  if (userIsAdmin(req)) {
    return res.send(
      '<h1>You are already an admin</h1> <p><a href="/admin/dashboard">Go to dashboard</a></p>',
    );
  }
  res.render("upgradeToAdmin", {
    title: "Upgrade Account to Admin",
    errors: [],
  });
}

const postUpgradeToAdmin = [
  validateData,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsMap = {};
      errors.array().forEach((error) => (errorsMap[error.path] = error.msg));
      return res.status(422).render("upgradeToAdmin", {
        title: "Upgrade Account to Admin",
        errors: errorsMap,
      });
    }
    const roleName = "admin";
    try {
      const adminPasswordHash = await findHashByRoleName(roleName);
      if (!adminPasswordHash) {
        return res.status(500).json("Admin role not found");
      }
      const { adminPassword } = matchedData(req);

      const isValid = validatePassword(adminPassword, adminPasswordHash);
      if (isValid) {
        await setUserAdminStatus(req.user.id, true);
        return res.redirect("/admin/dashboard");
      } else {
        return res.status(401).send("<p>Invalid Password</p>");
      }
    } catch (err) {
      next(err);
    }
  },
];

module.exports = {
  getUpgradeAccountPage,
  getUpgradeToAdminPage,
  postUpgradeToAdmin,
};
