const User = require('../models/User');
const Invention = require('../models/Invention');

// @desc    Register
// @route   GET /api/
// @access  Public
exports.register = async (req, res, next) => {
    const { username } = req.body;

    try {
        let user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({
                success: false,
                error: 'Username already exists.'
            });
        }

        user = await User.create({ username });
        return res.status(201).json({
            success: true,
            data: user
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}


exports.login = async (req, res, next) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                success: false,
                error: 'User not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: user
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}


exports.deleteUser = async (req, res, next) => {

    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(400).json({
                success: false,
                error: 'User not found'
            });
        }

        await user.remove();
        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        return res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(400).json({
                success: false,
                error: 'User not found.'
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.updateRating = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return;
        }

        const inventions = await Invention.find({inventorName: user.username});
        let sum = 0;
        let count = inventions.length;
        if(count !== 0){
            inventions.map(inv => {
                sum += inv.productRating;
            });
    
            user.rating = (sum / count).toFixed(1);
            await user.save();
        }
       

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}