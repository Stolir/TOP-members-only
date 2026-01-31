const { Router } = require("express");
const {
  getUpgradeAccountPage,
  getUpgradeToAdminPage,
  postUpgradeToAdmin,
} = require("../controllers/upgradeAccountController");
const { isLoggedIn } = require("../middleware/authMiddleware");

const upgradeAccountRouter = Router();

upgradeAccountRouter.get("/", isLoggedIn, getUpgradeAccountPage);
upgradeAccountRouter.get("/admin", getUpgradeToAdminPage);
upgradeAccountRouter.post("/admin", postUpgradeToAdmin);

module.exports = upgradeAccountRouter;
