const categoryModel = require('../models/categoryModels');  

exports.getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.getCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};