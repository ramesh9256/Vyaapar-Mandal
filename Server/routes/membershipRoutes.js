const express = require('express');
const router = express.Router();
const membershipController = require('../controller/membershipController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public: Apply for membership
router.post('/apply', membershipController.applyMembership);

// Admin: View all applications
router.get('/all', authMiddleware, membershipController.getAllMemberships);

// Admin: Approve/Reject
router.put('/:id', authMiddleware, adminMiddleware, membershipController.updateMembershipStatus);

module.exports = router;
