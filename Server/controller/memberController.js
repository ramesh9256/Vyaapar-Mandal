const User = require('../models/userModel');

// ✅ Get all members
exports.getAllMembers = async (req, res) => {
    try {
        const members = await User.find({ role: 'member' }).select('-password');
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ msg: "Error fetching members", error: error.message });
    }
};

// ✅ Get single member by ID
exports.getMemberById = async (req, res) => {
    try {
        const member = await User.findById(req.params.id).select('-password');
        if (!member || member.role !== 'member') {
            return res.status(404).json({ msg: "Member not found" });
        }
        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ msg: "Error fetching member", error: error.message });
    }
};

// ✅ Update member by ID
exports.updateMember = async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
        res.status(200).json({ msg: "Member updated", updated });
    } catch (error) {
        res.status(500).json({ msg: "Update failed", error: error.message });
    }
};

// ✅ Delete member by ID
exports.deleteMember = async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Member deleted", deleted });
    } catch (error) {
        res.status(500).json({ msg: "Delete failed", error: error.message });
    }
};
