const Sale = require('../models/Sale');
const Prospect = require('../models/Prospect');
const Ebook = require('../models/Ebook');

// Obtenir les statistiques globales
exports.getStats = async (req, res) => {
  try {
    const totalSales = await Sale.countSales();
    const totalRevenue = await Sale.getTotalRevenue();
    const totalProspects = await Prospect.countProspects();

    res.json({
      totalSales,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalProspects,
      conversionRate: totalProspects > 0 ? Math.round((totalSales / totalProspects) * 100) : 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir les ventes récentes
exports.getRecentSales = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const sales = await Sale.getAllSales(limit, offset);
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
