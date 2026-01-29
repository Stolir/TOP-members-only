function getLoginPage(req, res) {
  res.render("login", { title: "Login" });
}

module.exports = { getLoginPage };
