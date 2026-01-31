module.exports.userIsAdmin = (req) => {
  if (req.isAuthenticated() && req.user.is_admin) {
    return true;
  }
  return false;
};

module.exports.userIsLoggedIn = (req) => {
  if (req.isAuthenticated()) {
    return true;
  }
  return false;
};
