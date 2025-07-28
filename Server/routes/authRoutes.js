const express = require('express');
const { registerUser, loginUser, getProfile, resetPasswordWithOtp, forgotPassword } = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getProfile);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password',resetPasswordWithOtp);

module.exports = router;
