const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {
        type: String,
        required: true
    }, 
    userName: {
        type: String,
    },
    location: {
        type: String,
        required: false
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        required: true 
    },
    googleId: {
        type: String
    },
    personalProfile: [{
        type: Schema.Types.ObjectId,
        ref: 'Photo'
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);