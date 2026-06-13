const express = require('express');
const statsController = require('../controllers/statsController');
const { authenticateToken } = require('../config/jwt');

const router = express.Router();

// Routes des statistiques
router.get('/', authenticateToken, statsController.getStats);
router.get('/sales/recent', authenticateToken, statsController.getRecentSales);

module.exports = router;
