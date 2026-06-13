const express = require('express');
const ebooksController = require('../controllers/ebooksController');
const { authenticateToken } = require('../config/jwt');

const router = express.Router();

// Routes des ebooks
router.get('/', ebooksController.getAllEbooks);
router.get('/:id', ebooksController.getEbook);
router.post('/', authenticateToken, ebooksController.createEbook);
router.put('/:id', authenticateToken, ebooksController.updateEbook);
router.delete('/:id', authenticateToken, ebooksController.deleteEbook);

module.exports = router;
