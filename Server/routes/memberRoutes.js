const express = require('express');
const router = express.Router();
const {
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember
} = require('../controller/memberController');

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// ✅ All routes below require login + admin access
router.get('/', authMiddleware, getAllMembers);
router.get('/:id', authMiddleware, adminMiddleware, getMemberById);
router.put('/:id', authMiddleware, adminMiddleware, updateMember);
router.delete('/:id', authMiddleware, adminMiddleware, deleteMember);

module.exports = router;
