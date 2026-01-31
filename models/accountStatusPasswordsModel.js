const pool = require("../database/pool");

async function findHashByRoleName(roleName) {
  const query = `
  SELECT password_hash FROM account_status_passwords WHERE role_name = $1
  `;

  try {
    const { rows } = await pool.query(query, [roleName]);
    return rows[0].password_hash;
  } catch (err) {
    console.error(`Error getting password hash for role "${roleName}": `, err);
    throw err;
  }
}

module.exports = {
  findHashByRoleName,
};
