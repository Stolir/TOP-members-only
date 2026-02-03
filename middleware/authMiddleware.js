module.exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.redirectUrl = req.originalUrl;
  res.redirect("/login");
};

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.is_admin) {
    next();
  } else {
    res.status(403).render("status", {
      title: "An error occurred!",
      status: { code: 403, msg: "You are not authorized to view this page" },
      redirect: { path: "/", msg: "Go to home page" },
    });
  }
};
