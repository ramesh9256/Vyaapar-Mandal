const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token; // ✅ Correct place

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized - Token missing in cookie" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password'); // optional

    if (!req.user) {
      return res.status(404).json({ msg: "User not found" });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token", error: err.message });
  }
};

module.exports = authMiddleware;
