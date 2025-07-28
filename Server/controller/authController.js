const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

// Register
// Register
exports.registerUser = async (req, res) => {
    try {
        const { name, phone, email, password, role } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            phone,
            email,
            password: hashedPassword,
            role: role || "member"
        });

        res.status(201).json({ msg: "User Registered Successfully", user });
    } catch (err) {
        res.status(500).json({ msg: "Registration Error", error: err.message });
    }
};

// Login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ msg: "Incorrect password" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false
        })

        // 📧 Send login email before responding
        await sendEmail(user.email, "Login Alert", `
            <h3>Hello ${user.name},</h3>
            <p>You have successfully logged into your Vyapaar Mandal account.</p>
        `);

        // ✅ Now send response
        res.status(200).json({ msg: "Login successful", token, user });

    } catch (err) {
        res.status(500).json({ msg: "Login Error", error: err.message });
    }
};

// Profile route (protected)
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) return res.status(404).json({ msg: "User not found" });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching profile", error: err.message });
    }
};
