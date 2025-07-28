    const Complaint = require('../models/complaintModel');

    // 📝 Create new complaint
    exports.createComplaint = async (req, res) => {
        try {
            const { subject, description  } = req.body;

            if (!subject || !description) {
                return res.status(400).json({ msg: "Subject and description are required" });
            }

            const complaint = await Complaint.create({
                subject,
                description,
                filedBy: req.user.userId
            });

            res.status(201).json({ msg: "Complaint filed successfully", complaint });
        } catch (err) {
            res.status(500).json({ msg: "Error filing complaint", error: err.message });
        }
    };

    // 📋 Get all complaints (admin)
    exports.getAllComplaints = async (req, res) => {
        try {
            const complaints = await Complaint.find()
                .populate('filedBy', 'name email')
                .sort({ createdAt: -1 });

            res.status(200).json(complaints);
        } catch (err) {
            res.status(500).json({ msg: "Error loading complaints", error: err.message });
        }
    };

    // 🔁 Update complaint status (admin)
    exports.updateComplaintStatus = async (req, res) => {
        try {
            const { status } = req.body;

            const complaint = await Complaint.findByIdAndUpdate(
                req.params.id,
                { status },
                { new: true }
            );

            if (!complaint) {
                return res.status(404).json({ msg: "Complaint not found" });
            }

            res.status(200).json({ msg: "Status updated", complaint });
        } catch (err) {
            res.status(500).json({ msg: "Error updating status", error: err.message });
        }
    };
