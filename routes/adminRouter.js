const { Router } = require("express");
const {
  getAdminDashboard,
  getAdminSetClubPass,
  getAdminSetAdminPass,
  postAdminSetAdminPass,
  postAdminSetClubPass,
} = require("../controllers/adminController");

const adminRouter = Router();

adminRouter.get("/dashboard", getAdminDashboard);
adminRouter.get("/set-club-password", getAdminSetClubPass);
adminRouter.post("/set-club-password", postAdminSetClubPass);
adminRouter.get("/set-admin-password", getAdminSetAdminPass);
adminRouter.post("/set-admin-password", postAdminSetAdminPass);

module.exports = adminRouter;
