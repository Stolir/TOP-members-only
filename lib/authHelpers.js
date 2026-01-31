module.exports.isAdminUser = (req) => {
  if (req.isAuthenticated() && req.user.is_admin) {
    return true;
  }
  return false;
};
