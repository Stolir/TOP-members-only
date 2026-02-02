const pool = require("../database/pool");

async function getAllMessages(isMember) {
  let query;
  if (isMember) {
    query = `
    SELECT m.*, u.username AS username FROM messages m
    JOIN users u ON m.user_id = u.id
    ORDER BY created_at DESC
    `;
  } else {
    query = `SELECT id, title, body, created_at FROM messages`;
  }

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.error("Error getting all messages: ", err);
    throw err;
  }
}

async function createNewMessage(message, userId) {
  const query = `
  INSERT INTO messages (title, body, user_id) 
  VALUES ($1, $2, $3)
  `;

  try {
    await pool.query(query, [message.title, message.body, userId]);
  } catch (err) {
    console.error("Error creating new message: ", err);
    throw err;
  }
}

async function deleteMessageById(msgId) {
  const query = `
  DELETE FROM messages WHERE id = $1
  `;

  try {
    await pool.query(query, [msgId]);
  } catch (err) {
    console.log(`Error deleting message ${msgId}: `, err);
    throw err;
  }
}

module.exports = { getAllMessages, createNewMessage, deleteMessageById };
