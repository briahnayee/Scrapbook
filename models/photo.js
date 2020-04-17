const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
    },
    text: {
        type: String,
        required: true,
    }, 
    userName: {
        type: String,
    }
}, {
    timestamps: true
})

const photoSchema = new Schema ({
    userId: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
    }],
    description: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    comments: [commentSchema],
}, {
    timestamps: true
})

module.exports = mongoose.model('Photo', photoSchema);