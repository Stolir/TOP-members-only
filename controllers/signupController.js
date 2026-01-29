function getSignupPage(req, res) {
  res.render("signup", { title: "Sign Up" });
}

module.exports = { getSignupPage };
