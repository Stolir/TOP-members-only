const { Router } = require("express");
const {
  getCreateMessagePage,
  postCreateMessage,
  postDeleteMessage,
} = require("../controllers/messagesController");
const { isAdmin } = require("../middleware/authMiddleware");

const messagesRouter = Router();

messagesRouter.get("/new", getCreateMessagePage);
messagesRouter.post("/", postCreateMessage);
messagesRouter.post("/:msgId/delete", isAdmin, postDeleteMessage);

module.exports = messagesRouter;
