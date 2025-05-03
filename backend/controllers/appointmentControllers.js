const appointmentModel = require('../models/appointmentModels'); 

exports.getAppointmentsByStatus = async (req, res) => {
    try {
        const { user_id, status} = req.params;
        const appointments = await appointmentModel.getAppointmentsByStatus(user_id, status);
        res.status(200).json({ data: appointments });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching upcoming appointments', error: error.message });
    }
}