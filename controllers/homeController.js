async function getHomePage(req, res) {
  res.render("index", { title: "Home" });
}

module.exports = { getHomePage };
