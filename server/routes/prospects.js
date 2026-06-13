const express = require('express');
const prospectsController = require('../controllers/prospectsController');
const { authenticateToken } = require('../config/jwt');

const router = express.Router();

// Routes des prospects
router.post('/', prospectsController.createProspect);
router.get('/', authenticateToken, prospectsController.getAllProspects);
router.get('/:id', authenticateToken, prospectsController.getProspect);
router.delete('/:id', authenticateToken, prospectsController.deleteProspect);

module.exports = router;
