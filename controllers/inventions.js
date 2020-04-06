const Invention = require('../models/Invention');

exports.addInvention = async (req, res, next) => {
    // const { productName, photoUrl, cost, materialsUsed, inventorName } = req.body;

    try {
        const invention = await Invention.create(req.body);

        return res.status(201).json({
            success: true,
            data: invention
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.deleteInvention = async (req, res, next) => {
    const { id } = req.params;
    try {
        const invention = await Invention.findById(id);

        invention.shown = false;

        await invention.save();

        return res.status(201).json({
            success: true,
            data: invention
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.getAllInventions = async (req, res, next) => {
    try {
        const inventions = await Invention.find();

        return res.status(201).json({
            success: true,
            data: inventions
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.getInventionsFromUser = async (req, res, next) => {
    const { username } = req.params;

    try {
        const inventions = await Invention.find({ username });

        if (!inventions) {
            return res.status(400).json({
                success: false,
                error: "Inventions not found"
            });
        }

        return res.status(201).json({
            success: true,
            count: inventions.length,
            data: inventions
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.rateInvention = async (req, res, next) => {
    // console.log(req.body);
    const { rate, username } = req.body;

    try {
        const invention = await Invention.findById(req.params.id);
        invention.ratedBy = {...invention.ratedBy, [username]: rate};
        const sum = Object.values(invention.ratedBy).reduce((a,b) => a+b, 0)
        invention.productRating = (sum / Object.keys(invention.ratedBy).length).toFixed(1);

        await invention.save();
        return res.status(201).json({
            success: true,
            data: invention
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}