const { body, validationResult, matchedData } = require("express-validator");
const {
  createNewMessage,
  deleteMessageById,
} = require("../models/messagesModel");

const validateData = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .bail()
    .isLength({ max: 168 })
    .withMessage("Title must not be longer than 168 characters"),
  body("body")
    .trim()
    .notEmpty()
    .withMessage("Body is required")
    .bail()
    .isLength({ max: 750 })
    .withMessage("Body must not be longer than 750 characters"),
];

function getCreateMessagePage(req, res) {
  res.render("createNewMessage", { errors: {} });
}

const postCreateMessage = [
  validateData,
  async (req, res, next) => {
    const errors = validationResult(req);
    const errorsMap = {};
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => (errorsMap[error.path] = error.msg));
      return res.render("createNewMessage", { errors: errorsMap });
    }
    const data = matchedData(req);
    try {
      await createNewMessage(data, req.user.id);
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  },
];

async function postDeleteMessage(req, res) {
  const { msgId } = req.params;
  await deleteMessageById(msgId);
  res.redirect("/");
}

module.exports = {
  getCreateMessagePage,
  postCreateMessage,
  postDeleteMessage,
};
