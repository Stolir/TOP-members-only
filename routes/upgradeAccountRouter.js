const { Router } = require("express");
const {
  getUpgradeAccountPage,
  getUpgradeToAdminPage,
  postUpgradeToAdmin,
  getUpgradeToMemberPage,
  postUpgradeToMember,
} = require("../controllers/upgradeAccountController");
const { isLoggedIn } = require("../middleware/authMiddleware");

const upgradeAccountRouter = Router();

upgradeAccountRouter.get("/", getUpgradeAccountPage);
upgradeAccountRouter.get("/admin", getUpgradeToAdminPage);
upgradeAccountRouter.post("/admin", postUpgradeToAdmin);
upgradeAccountRouter.get("/club-member", getUpgradeToMemberPage);
upgradeAccountRouter.post("/club-member", postUpgradeToMember);

module.exports = upgradeAccountRouter;
