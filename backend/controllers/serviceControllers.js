const serviceModel = require('../models/serviceModels');

exports.getServicesBySalon = async (req, res) => {
    try {
        const salon_id = req.params.salon_id; 
        const services = await serviceModel.getServicesBySalon(salon_id);
        res.json(services);
    } catch (error) {
        console.error("Error fetching services:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}