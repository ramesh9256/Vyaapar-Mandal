const express = require('express');
const router = express.Router();
const { createMessage, getAllMessages } = require('../controller/contactController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public route - send message
router.post('/send', createMessage);

// Admin only - view all messages
router.get('/all', authMiddleware, adminMiddleware, getAllMessages);

module.exports = router;
