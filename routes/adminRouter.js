const { Router } = require("express");
const { getAdminDashboard } = require("../controllers/adminController");

const adminRouter = Router();

adminRouter.get("/dashboard", getAdminDashboard);

module.exports = adminRouter;
