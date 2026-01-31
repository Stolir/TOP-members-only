const { Router } = require("express");
const { logout } = require("../controllers/logoutRouter");

const logoutRouter = Router();

logoutRouter.get("/", logout);

module.exports = logoutRouter;
