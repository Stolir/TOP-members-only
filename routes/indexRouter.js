const { Router } = require("express");
const { getHomePage } = require("../controllers/homeController");

const indexRouter = Router();

indexRouter.get("/", getHomePage);

module.exports = indexRouter;
