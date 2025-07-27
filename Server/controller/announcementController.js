const Announcement = require('../models/announcementModel');

// Create announcement
exports.createAnnouncement = async (req, res) => {
    try {
        const { title, content } = req.body;

        const announcement = await Announcement.create({
            title,
            content,
            postedBy: req.user.userId
        });

        res.status(201).json({ msg: "Announcement created", announcement });
    } catch (err) {
        res.status(500).json({ msg: "Error", error: err.message });
    }
};

// Get all announcements (public)
exports.getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find()
            .populate("postedBy", "name email")
            .sort({ createdAt: -1 });
        res.status(200).json(announcements);
    } catch (err) {
        res.status(500).json({ msg: "Error", error: err.message });
    }
};
