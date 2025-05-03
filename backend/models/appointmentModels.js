const db = require('../config/db');

exports.getAppointmentsByStatus = async (user_id, status) => {
    const [rows] = await db.query(
        'SELECT a.date, a.time, s.name AS salon_name, s.location FROM appointments a JOIN salons s ON a.salon_id = s.id WHERE a.user_id = ? AND a.status = ?',
        [user_id, status]
    );
    return rows;
};

