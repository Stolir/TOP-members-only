const pool = require("../database/pool");

async function findUserByUsername(username) {
  const query = `
    SELECT * FROM users WHERE username = $1
  `;
  try {
    const { rows } = await pool.query(query, [username]);
    return rows[0];
  } catch (err) {
    console.error(`Error finding user with username ${username}: `, err);
    throw err;
  }
}

async function findUserById(userId) {
  const query = `
  SELECT * FROM users WHERE id = $1
  `;

  try {
    const { rows } = await pool.query(query, [userId]);
    return rows[0];
  } catch (err) {
    console.error(`Error finding user with id ${userId}: `, err);
    throw err;
  }
}

async function createUser(data) {
  const query = `
  INSERT INTO users (first_name, last_name, username, password_hash)
  VALUES ($1, $2, $3, $4)
  RETURNING username
  `;

  try {
    const { rows } = await pool.query(query, data);
    return rows[0].username;
  } catch (err) {
    console.error("Error creating user: ", err);
    throw err;
  }
}

async function setUserAdminStatus(userId, value) {
  const query = `
  UPDATE users SET is_admin = $2 WHERE id = $1
  `;

  try {
    await pool.query(query, [userId, value]);
  } catch (err) {
    console.error(`Error setting user number ${userId} to Admin: `, err);
    throw err;
  }
}

async function setUserMemberStatus(userId, value) {
  const query = `
  UPDATE users SET is_club_member = $2 WHERE id = $1
  `;

  try {
    await pool.query(query, [userId, value]);
  } catch (err) {
    console.error(`Error setting user number ${userId} to club member: `, err);
    throw err;
  }
}

module.exports = {
  findUserByUsername,
  findUserById,
  createUser,
  setUserAdminStatus,
  setUserMemberStatus,
};
