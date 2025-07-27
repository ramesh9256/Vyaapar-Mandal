const express = require('express');
const router = express.Router();
const { createAnnouncement, getAnnouncements } = require('../controller/announcementController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Admin only
router.post('/create', authMiddleware, adminMiddleware, createAnnouncement);

// Public route
router.get('/', getAnnouncements);

module.exports = router;
    