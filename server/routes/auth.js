const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Routes d'authentification
router.post('/login', authController.login);
router.post('/init-admin', authController.initializeAdmin);
router.get('/check-admin', authController.checkAdmin);

module.exports = router;
