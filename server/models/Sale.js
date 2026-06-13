const db = require('../config/database');

// Créer une vente
async function createSale({ prospectId, ebookId, amount, paymentMethod, transactionId }) {
  const result = await db.run(
    `INSERT INTO sales (prospect_id, ebook_id, amount, payment_method, transaction_id, status)
     VALUES (?, ?, ?, ?, ?, 'completed')`,
    [prospectId, ebookId, amount, paymentMethod, transactionId]
  );
  return result.id;
}

// Obtenir les ventes
async function getAllSales(limit = 100, offset = 0) {
  return await db.all(
    `SELECT s.*, p.name, p.email, e.name as ebook_name
     FROM sales s
     LEFT JOIN prospects p ON s.prospect_id = p.id
     LEFT JOIN ebooks e ON s.ebook_id = e.id
     ORDER BY s.created_at DESC
     LIMIT ? OFFSET ?`,
    [limit, offset]
  );
}

// Compter les ventes
async function countSales() {
  const result = await db.get('SELECT COUNT(*) as count FROM sales WHERE status = "completed"');
  return result.count;
}

// Obtenir le total des ventes
async function getTotalRevenue() {
  const result = await db.get(
    'SELECT SUM(amount) as total FROM sales WHERE status = "completed"'
  );
  return result.total || 0;
}

module.exports = {
  createSale,
  getAllSales,
  countSales,
  getTotalRevenue
};
