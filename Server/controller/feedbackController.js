const Feedback = require('../models/feedbackModel');

// Submit feedback
exports.submitFeedback = async (req, res) => {
    try {
        const { message } = req.body;
        const newFeedback = await Feedback.create({
            message,
            submittedBy: req.user.userId
        });
        res.status(201).json({ msg: "Feedback submitted", newFeedback });
    } catch (err) {
        res.status(500).json({ msg: "Error submitting feedback", error: err.message });
    }
};

// Get all feedback (Admin only)
exports.getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate('submittedBy', 'name email');
        res.status(200).json(feedbacks);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching feedback", error: err.message });
    }
};
