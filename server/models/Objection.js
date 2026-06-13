const db = require('../config/database');

// Obtenir une objection et sa réponse
async function getObjectionResponse(keyword) {
  return await db.get(
    'SELECT response FROM objections WHERE keyword LIKE ? LIMIT 1',
    [`%${keyword}%`]
  );
}

// Obtenir toutes les objections
async function getAllObjections() {
  return await db.all('SELECT * FROM objections ORDER BY category ASC');
}

module.exports = {
  getObjectionResponse,
  getAllObjections
};
