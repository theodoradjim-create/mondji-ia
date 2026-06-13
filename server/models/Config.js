const db = require('../config/database');

// Obtenir la configuration
async function getConfig(key) {
  const result = await db.get('SELECT value FROM config WHERE key = ?', [key]);
  return result ? result.value : null;
}

// Obtenir toute la configuration
async function getAllConfig() {
  const results = await db.all('SELECT key, value FROM config');
  const config = {};
  results.forEach(r => config[r.key] = r.value);
  return config;
}

// Mettre à jour la configuration
async function updateConfig(key, value) {
  const existing = await db.get('SELECT id FROM config WHERE key = ?', [key]);
  if (existing) {
    await db.run('UPDATE config SET value = ? WHERE key = ?', [value, key]);
  } else {
    await db.run('INSERT INTO config (key, value) VALUES (?, ?)', [key, value]);
  }
}

module.exports = {
  getConfig,
  getAllConfig,
  updateConfig
};
