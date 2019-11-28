const mongoose = require('mongoose');

const casesSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Cases', casesSchema);