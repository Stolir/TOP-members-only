const bcrypt = require("bcryptjs");

function generateHashedPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function validatePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

module.exports = {
  generateHashedPassword,
  validatePassword,
};
