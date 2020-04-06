const mongoose = require('mongoose');



const inventionSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required']
    },
    photoUrl: {
        type: String,
        required: [true, 'Photo URL is required']
    },
    cost: {
        type: Number,
        required: [true, 'Please enter the cost']
    },
    materialsUsed: {
        type: String,
        required: [true, 'Please enter the materials']
    },
    quote: {
        type: String,
        default: ""
    },
    inventorName: {
        type: String,
        required: [true, 'User required']
    },
    productRating: {
        type: Number,
        default: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    shown: {
        type: Boolean,
        default: true
    },
    ratedBy: {
        type: { String: Number },
        default: {}
    }
});

module.exports = mongoose.model('Invention', inventionSchema);
