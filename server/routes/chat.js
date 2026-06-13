const express = require('express');
const chatController = require('../controllers/chatController');

const router = express.Router();

// Routes du chatbot
router.post('/session', chatController.createSession);
router.post('/message', chatController.sendMessage);
router.get('/history/:sessionId', chatController.getHistory);

module.exports = router;
