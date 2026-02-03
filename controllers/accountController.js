function getManageAccountPage(req, res) {
  res.render("manageAccount", { title: "Manage Account", user: req.user });
}

module.exports = {
  getManageAccountPage,
};
