const { body, validationResult, matchedData } = require("express-validator");
const { userIsAdmin, userIsClubMember } = require("../lib/authHelpers");
const { validatePassword } = require("../lib/passwordUtils");
const { findHashByRoleName } = require("../models/accountStatusPasswordsModel");
const {
  setUserRole,
  setUserAdminStatus,
  setUserMemberStatus,
} = require("../models/usersModel");

const validateData = [
  body("password").notEmpty().withMessage("Password is required"),
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
  res.render("upgradeAccountForm", {
    title: "Upgrade Account to Admin",
    postRoute: "admin",
    errors: {},
  });
}

const postUpgradeToAdmin = [
  validateData,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsMap = {};
      errors.array().forEach((error) => (errorsMap[error.path] = error.msg));
      return res.status(422).render("upgradeAccountForm", {
        title: "Upgrade Account to Admin",
        postRoute: "admin",
        errors: errorsMap,
      });
    }
    const roleName = "admin";
    try {
      const adminPasswordHash = await findHashByRoleName(roleName);
      if (!adminPasswordHash) {
        return res.status(500).json(`${roleName} role not found`);
      }
      const { password } = matchedData(req);

      const isValid = validatePassword(password, adminPasswordHash);
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

function getUpgradeToMemberPage(req, res, next) {
  if (userIsClubMember(req)) {
    return res.send(
      '<h1>You are already a club member</h1> <p><a href="/">Go to home page</a></p>',
    );
  }
  res.render("upgradeAccountForm", {
    title: "Upgrade Account to Member",
    postRoute: "club-member",
    errors: {},
  });
}

const postUpgradeToMember = [
  validateData,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsMap = {};
      errors.array().forEach((error) => (errorsMap[error.path] = error.msg));
      return res.status(422).render("upgradeAccountForm", {
        title: "Upgrade Account to Member",
        postRoute: "club-member",
        errors: errorsMap,
      });
    }
    const roleName = "club_member";
    try {
      const memberPasswordHash = await findHashByRoleName(roleName);
      if (!memberPasswordHash) {
        return res.status(500).json(`${roleName} role not found`);
      }
      const { password } = matchedData(req);

      const isValid = validatePassword(password, memberPasswordHash);
      if (isValid) {
        await setUserMemberStatus(req.user.id, true);
        return res.redirect("/");
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
  getUpgradeToMemberPage,
  postUpgradeToMember,
};
