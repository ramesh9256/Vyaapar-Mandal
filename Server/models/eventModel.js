const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Event title is required'],  // Custom error message
        trim: true,  // Trims any spaces around the title
        minlength: [5, 'Event title must be at least 5 characters long']  // Custom validation
    },
    description: {
        type: String,
        default: 'No description provided',  // Default value if no description is given
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'Event date is required'],  // Custom error message
    },
    location: {
        type: String,
        trim: true,
        default: 'Not specified'  // Default value if no location is provided
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Creator is required']  // Custom error message
    }
}, {
    timestamps: true  // Automatically add createdAt and updatedAt
});

module.exports = mongoose.model('Event', eventSchema);
