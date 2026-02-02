const { userIsClubMember } = require("../lib/authHelpers");
const { getAllMessages } = require("../models/messagesModel");

async function getHomePage(req, res) {
  const isMember = userIsClubMember(req);
  const messages = await getAllMessages(isMember);
  res.render("index", { title: "Home", messages });
}

module.exports = { getHomePage };
