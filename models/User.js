const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'There must be a username']
    },
    rating: {
        type: Number,
        default: 0
    },
    gallery: {
        type: [mongoose.Types.ObjectId],
        default: []
    }
});

module.exports = mongoose.model('User', UserSchema);