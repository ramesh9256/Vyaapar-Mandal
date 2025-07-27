const Event = require('../models/eventModel');

// Create new event (Admin Only)
exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, location } = req.body;

        const event = await Event.create({
            title,
            description,
            date,
            location,
            createdBy: req.user.userId
        });

        res.status(201).json({ msg: "Event created successfully", event });
    } catch (err) {
        res.status(500).json({ msg: "Error creating event", error: err.message });
    }
};

// Get all events (Public)
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate("createdBy", "name email role");
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching events", error: err.message });
    }
};

// Update event (Admin Only)
exports.updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const updated = await Event.findByIdAndUpdate(eventId, req.body, { new: true });

        res.status(200).json({ msg: "Event updated", updated });
    } catch (err) {
        res.status(500).json({ msg: "Error updating event", error: err.message });
    }
};

// Delete event (Admin Only)
exports.deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        await Event.findByIdAndDelete(eventId);

        res.status(200).json({ msg: "Event deleted" });
    } catch (err) {
        res.status(500).json({ msg: "Error deleting event", error: err.message });
    }
};
