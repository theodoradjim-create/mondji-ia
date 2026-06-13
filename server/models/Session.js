const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Créer une nouvelle session
async function createSession(userAgent, ipAddress) {
  const sessionId = uuidv4();
  await db.run(
    'INSERT INTO sessions (id, user_agent, ip_address) VALUES (?, ?, ?)',
    [sessionId, userAgent, ipAddress]
  );
  return sessionId;
}

// Obtenir une session
async function getSession(sessionId) {
  return await db.get('SELECT * FROM sessions WHERE id = ?', [sessionId]);
}

// Ajouter un message
async function addMessage(sessionId, role, content) {
  await db.run(
    'INSERT INTO messages (session_id, role, content) VALUES (?, ?, ?)',
    [sessionId, role, content]
  );
}

// Obtenir l'historique des messages
async function getMessageHistory(sessionId) {
  return await db.all(
    'SELECT * FROM messages WHERE session_id = ? ORDER BY timestamp ASC',
    [sessionId]
  );
}

// Marquer une session comme convertie
async function markSessionConverted(sessionId) {
  await db.run(
    'UPDATE sessions SET is_converted = 1 WHERE id = ?',
    [sessionId]
  );
}

module.exports = {
  createSession,
  getSession,
  addMessage,
  getMessageHistory,
  markSessionConverted
};
