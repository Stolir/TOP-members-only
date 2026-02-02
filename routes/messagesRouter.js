const { Router } = require("express");
const {
  getCreateMessagePage,
  postCreateMessage,
} = require("../controllers/messagesController");

const messagesRouter = Router();

messagesRouter.get("/new", getCreateMessagePage);
messagesRouter.post("/", postCreateMessage);

module.exports = messagesRouter;
