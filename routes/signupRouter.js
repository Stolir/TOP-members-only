const { Router } = require("express");
const { getSignupPage } = require("../controllers/signupController");

const signupRouter = Router();

signupRouter.get("/", getSignupPage);

module.exports = signupRouter;
