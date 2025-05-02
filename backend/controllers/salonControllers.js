const salonModel = require('../models/salonModels');

exports.getSalonsByCategory = async (req, res) => {
    try {
        const category_id = req.params.category_id; // Assuming category_id is passed as a URL parameter
        const salons = await salonModel.getSalonsByCategory(category_id);
        res.json(salons);
    } catch (error) {
        console.error("Error fetching salons:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};