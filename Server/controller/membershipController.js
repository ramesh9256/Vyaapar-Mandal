const Membership = require('../models/membershipModel');
const sendEmail = require('../utils/sendEmail');
// Apply for membership (Public)
exports.applyMembership = async (req, res) => {
    try {
        const { name, email, phone, address, businessName } = req.body;

        // Save to DB
        const newApplication = await Membership.create(req.body);

        // Send confirmation to applicant
        await sendEmail(email, "Vyapaar Mandal: Membership Application Received", `
            <h3>Hello ${name},</h3>
            <p>Thank you for applying for membership in Vyapaar Mandal.</p>
            <p>We have received your application and will review it shortly.</p>
            <p><strong>Your Details:</strong></p>
            <ul>
                <li><strong>Phone:</strong> ${phone}</li>
                <li><strong>Address:</strong> ${address}</li>
                <li><strong>Business:</strong> ${businessName}</li>
            </ul>
        `);

        // Notify admin
        await sendEmail(process.env.SMTP_EMAIL, "New Membership Application", `
            <h3>New Membership Application Received</h3>
            <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Phone:</strong> ${phone}</li>
                <li><strong>Address:</strong> ${address}</li>
                <li><strong>Business Name:</strong> ${businessName}</li>
            </ul>
        `);

        res.status(201).json({ msg: "Application submitted", newApplication });

    } catch (err) {
        res.status(500).json({ msg: "Application failed", error: err.message });
    }
};

// Get all applications (Admin only)
exports.getAllMemberships = async (req, res) => {
    try {
        const applications = await Membership.find().sort({ appliedAt: -1 });
        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ msg: "Failed to fetch applications", error: err.message });
    }
};

// Approve/Reject application
exports.updateMembershipStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const allowedStatus = ['Approved', 'Rejected'];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ msg: "Invalid status" });
        }

        const updated = await Membership.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.status(200).json({ msg: "Status updated", updated });
    } catch (err) {
        res.status(500).json({ msg: "Update failed", error: err.message });
    }
};
