const express = require('express');
const router = express.Router();
const galleryController = require('../controller/galleryController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Upload image (admin only optional)
router.post('/upload', authMiddleware, upload.single('image'), galleryController.uploadImage);

// Get all gallery images
router.get('/', galleryController.getGallery);

module.exports = router;
