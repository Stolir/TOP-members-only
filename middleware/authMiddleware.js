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
    res
      .status(403)
      .send(
        "<h1>You are not authorized to view this page</h1> <a href='/'>Return to home page</a>",
      );
  }
};
