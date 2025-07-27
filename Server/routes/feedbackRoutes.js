const express = require('express');
const router = express.Router();
const feedbackController = require('../controller/feedbackController');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

// POST /api/feedback → Authenticated users
router.post('/', auth, feedbackController.submitFeedback);

// GET /api/feedback → Admin only
router.get('/', auth, feedbackController.getAllFeedback);

module.exports = router;
