function logout(req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);
    res.send("<h1>You are logged out.</h1>");
  });
}

module.exports = { logout };
