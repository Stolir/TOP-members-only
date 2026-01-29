const { Router } = require("express");
const { getLoginPage } = require("../controllers/loginController");

const loginRouter = Router();

loginRouter.get("/", getLoginPage);

module.exports = loginRouter;
