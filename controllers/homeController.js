const { parse, format } = require("date-fns");
const { userIsClubMember } = require("../lib/authHelpers");
const { getAllMessages } = require("../models/messagesModel");

async function getHomePage(req, res) {
  const isMember = userIsClubMember(req);
  const messages = await getAllMessages(isMember);

  const formattedMessages = messages.map((message) => {
    return {
      ...message,
      formattedDate: format(message.created_at, "yyyy-MM-dd HH:mm"),
    };
  });

  res.render("index", {
    title: "Home",
    messages: formattedMessages,
  });
}

module.exports = { getHomePage };
