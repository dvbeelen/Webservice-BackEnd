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
    summary: {
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
    
}, {id: false});

casesSchema.set('toObject', {virtuals: true})
casesSchema.set('toJSON', {virtuals: true})

casesSchema.virtual('_links').get(function() {
    return {
        self: {
            href: `http://145.24.222.215:8000/cases/${this._id}`
        },
        collection: {
            href: `http://145.24.222.215:8000/cases/`
        }
    }
});

module.exports = mongoose.model('Cases', casesSchema);