const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    rating: Number,
    gallery: [mongoose.Types.ObjectId]
});


const inventionSchema = new mongoose.Schema({
    productName: String,
    photoUrl: String,
    cost: Number,
    materialsUsed: String,
    inventorName: String,
    productRating: Number,
    inventorId: mongoose.Types.ObjectId,
    ratedBy: [
        {
            user: mongoose.Types.ObjectId,
            rate: Number
        }
    ]
});


exports.User = mongoose.model('User', UserSchema);

exports.Invention = mongoose.model('Invention', inventionSchema);
