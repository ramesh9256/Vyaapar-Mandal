const express = require('express');
const router = express.Router();
const complaintController = require('../controller/complaintController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// 📝 Create complaint (any logged-in user)
router.post('/', authMiddleware, complaintController.createComplaint);

// 📋 View all complaints (admin only)
router.get('/', authMiddleware, complaintController.getAllComplaints);

// ✅ Update complaint status (admin only)
router.put('/:id/status', authMiddleware, adminMiddleware, complaintController.updateComplaintStatus);

module.exports = router;
