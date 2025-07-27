const User = require('../models/userModel');

const adminMiddleware = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied: Admins only' });
        }
        next();
    } catch (error) {
        res.status(500).json({ msg: 'Authorization error', error: error.message });
    }
};

module.exports = adminMiddleware;
