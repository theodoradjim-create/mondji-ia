const express = require('express');
const configController = require('../controllers/configController');
const { authenticateToken } = require('../config/jwt');

const router = express.Router();

// Routes de configuration
router.get('/', configController.getConfig);
router.put('/', authenticateToken, configController.updateConfig);

module.exports = router;
