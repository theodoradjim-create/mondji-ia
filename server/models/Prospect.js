const db = require('../config/database');

// Créer un nouveau prospect
async function createProspect(sessionId, { name, email, whatsapp, interestedEbooks, mainObjection }) {
  try {
    const result = await db.run(
      `INSERT INTO prospects (session_id, name, email, whatsapp, interested_ebooks, main_objection)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [sessionId, name, email, whatsapp, JSON.stringify(interestedEbooks), mainObjection]
    );
    return result.id;
  } catch (err) {
    throw new Error('Erreur lors de la création du prospect: ' + err.message);
  }
}

// Obtenir un prospect
async function getProspect(id) {
  const prospect = await db.get('SELECT * FROM prospects WHERE id = ?', [id]);
  if (prospect && prospect.interested_ebooks) {
    prospect.interested_ebooks = JSON.parse(prospect.interested_ebooks);
  }
  return prospect;
}

// Obtenir un prospect par email
async function getProspectByEmail(email) {
  return await db.get('SELECT * FROM prospects WHERE email = ?', [email]);
}

// Obtenir tous les prospects
async function getAllProspects(limit = 100, offset = 0) {
  const prospects = await db.all(
    'SELECT * FROM prospects ORDER BY created_at DESC LIMIT ? OFFSET ?',
    [limit, offset]
  );
  return prospects.map(p => ({
    ...p,
    interested_ebooks: p.interested_ebooks ? JSON.parse(p.interested_ebooks) : []
  }));
}

// Compter les prospects
async function countProspects() {
  const result = await db.get('SELECT COUNT(*) as count FROM prospects');
  return result.count;
}

// Mettre à jour un prospect
async function updateProspect(id, data) {
  const updates = [];
  const values = [];
  
  for (const [key, value] of Object.entries(data)) {
    updates.push(`${key} = ?`);
    if (key === 'interested_ebooks') {
      values.push(JSON.stringify(value));
    } else {
      values.push(value);
    }
  }
  
  values.push(id);
  await db.run(
    `UPDATE prospects SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    values
  );
}

// Supprimer un prospect
async function deleteProspect(id) {
  await db.run('DELETE FROM prospects WHERE id = ?', [id]);
}

module.exports = {
  createProspect,
  getProspect,
  getProspectByEmail,
  getAllProspects,
  countProspects,
  updateProspect,
  deleteProspect
};
