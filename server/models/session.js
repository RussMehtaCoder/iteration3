const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    attendees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    ],
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Session', sessionSchema);