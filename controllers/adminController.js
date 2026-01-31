function getAdminDashboard(req, res) {
  res.render("adminDashboard", { title: "Admin Dashboard" });
}

module.exports = { getAdminDashboard };
