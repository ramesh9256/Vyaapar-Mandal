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
            sameSite: "none",
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
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: "User not found" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        await sendEmail(user.email, "OTP for Password Reset", `
            <h3>Hello ${user.name},</h3>
            <p>Your OTP for resetting password is: <b>${otp}</b></p>
            <p>It will expire in 5 minutes.</p>
        `);

        res.status(200).json({ msg: "OTP sent to your email" }) ;
    } catch (err) {
        res.status(500).json({ msg: "Error sending OTP", error: err.message });
    }
};

// ✅ Reset Password via OTP
exports.resetPasswordWithOtp = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: "User not found" });

        if (user.otp !== otp || Date.now() > user.otpExpiry) {
            return res.status(400).json({ msg: "Invalid or expired OTP" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        res.status(200).json({ msg: "Password reset successful" });
    } catch (err) {
        res.status(500).json({ msg: "Reset failed", error: err.message });
    }
};
