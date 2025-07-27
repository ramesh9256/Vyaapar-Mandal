const express = require('express');
const router = express.Router();
const {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent
} = require('../controller/eventController');

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public Route
router.get('/', getAllEvents);

// Protected & Admin Only Routes
router.post('/create', authMiddleware, adminMiddleware, createEvent);
router.put('/update/:id', authMiddleware, adminMiddleware, updateEvent);
router.delete('/delete/:id', authMiddleware, adminMiddleware, );

module.exports = router;
