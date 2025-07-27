const Contact = require('../models/contactModel');
const sendEmail = require('../utils/sendEmail');

// Create a new contact message
exports.createMessage = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const newMsg = await Contact.create({ name, email, phone, message });

        // ✉️ Send email notification
        await sendEmail(email, "Thank You for Contacting Vyapaar Mandal", `
            <h3>Hello ${name},</h3>
            <p>Thank you for reaching out to Vyapaar Mandal. We have received your message and will get back to you shortly.</p>
            <p><strong>Your Message:</strong> ${message}</p>
        `);

        // Optional: Send to admin too
        await sendEmail(process.env.SMTP_EMAIL, "New Contact Message Received", `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message}</p>
        `);

        res.status(201).json({ msg: "Message sent successfully", newMsg });

    } catch (err) {
        res.status(500).json({ msg: "Error sending message", error: err.message });
    }
};

// Get all messages (admin only)
exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching messages", error: err.message });
    }
};
