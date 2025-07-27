const Gallery = require('../models/galleryModel');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Upload image
exports.uploadImage = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ msg: "No file uploaded" });
        }

        const result = await cloudinary.uploader.upload(file.path);
        fs.unlinkSync(file.path); // Delete local file after upload

        const newImage = await Gallery.create({
            imageUrl: result.secure_url,
            caption: req.body.caption || '',
            uploadedBy: req.user.userId
        });

        res.status(201).json({ msg: "Image uploaded", newImage });
    } catch (err) {
        res.status(500).json({ msg: "Upload error", error: err.message });
    }
};

// View all images
exports.getGallery = async (req, res) => {
    try {
        const images = await Gallery.find().populate('uploadedBy', 'name').sort({ createdAt: -1 });
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ msg: "Error loading gallery", error: err.message });
    }
};
