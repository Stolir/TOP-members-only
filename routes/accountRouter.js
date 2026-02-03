const { Router } = require("express");
const { getManageAccountPage } = require("../controllers/accountController");

const accountRouter = Router();

accountRouter.get("/manage", getManageAccountPage);

module.exports = accountRouter;
