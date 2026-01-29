const pool = require("../database/pool");

async function findUserByUsername(username) {
  const query = `
    SELECT * FROM users WHERE username = $1
  `;
  try {
    const { rows } = await pool.query(query, [username]);
    return rows[0];
  } catch (err) {
    console.error(`Error getting user by username "${username}": `, err);
    throw err;
  }
}

module.exports = {
  findUserByUsername,
};
