const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
})