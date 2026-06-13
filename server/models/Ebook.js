const db = require('../config/database');

// Obtenir tous les ebooks
async function getAllEbooks() {
  return await db.all(
    'SELECT * FROM ebooks WHERE is_active = 1 ORDER BY order_index ASC'
  );
}

// Obtenir un ebook
async function getEbook(id) {
  return await db.get('SELECT * FROM ebooks WHERE id = ?', [id]);
}

// Créer un ebook
async function createEbook({ name, description, price, downloadUrl, imageUrl }) {
  const result = await db.run(
    `INSERT INTO ebooks (name, description, price, download_url, image_url)
     VALUES (?, ?, ?, ?, ?)`,
    [name, description, price, downloadUrl, imageUrl]
  );
  return result.id;
}

// Mettre à jour un ebook
async function updateEbook(id, data) {
  const updates = [];
  const values = [];
  
  const allowedFields = ['name', 'description', 'price', 'download_url', 'image_url', 'order_index', 'is_active'];
  
  for (const [key, value] of Object.entries(data)) {
    if (allowedFields.includes(key)) {
      updates.push(`${key} = ?`);
      values.push(value);
    }
  }
  
  if (updates.length === 0) return;
  
  values.push(id);
  await db.run(
    `UPDATE ebooks SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    values
  );
}

// Supprimer un ebook
async function deleteEbook(id) {
  await db.run('UPDATE ebooks SET is_active = 0 WHERE id = ?', [id]);
}

module.exports = {
  getAllEbooks,
  getEbook,
  createEbook,
  updateEbook,
  deleteEbook
};
