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
    return res.render("status", {
      title: "An error occurred!",
      status: { code: 409, msg: "You are already an admin" },
      redirect: { path: "/admin/dashboard", msg: "Go to admin dashboard" },
    });
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
        return res.status(422).render("upgradeAccountForm", {
          title: "Upgrade Account to Admin",
          postRoute: "admin",
          errors: { password: "Wrong password" },
        });
      }
    } catch (err) {
      next(err);
    }
  },
];

function getUpgradeToMemberPage(req, res, next) {
  if (userIsClubMember(req)) {
    return res.render("status", {
      title: "An error occurred!",
      status: { code: 409, msg: "You are already a club member" },
      redirect: { path: "/", msg: "Go to home page" },
    });
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
        return res.status(422).render("upgradeAccountForm", {
          title: "Upgrade Account to Member",
          postRoute: "club-member",
          errors: { password: "Wrong password" },
        });
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
