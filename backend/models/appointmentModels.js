const db = require('../config/db');

exports.getAppointmentsByStatus = async (user_id, status) => {
    const [rows] = await db.query(
        'SELECT a.date, a.time, s.name AS salon_name, s.location FROM appointments a JOIN salons s ON a.salon_id = s.id WHERE a.user_id = ? AND a.status = ?',
        [user_id, status]
    );
    return rows;
};

exports.createAppointment = async (user_id, salon_id, date, time, status) => {
    const [rows] = await db.query(
        'INSERT INTO appointments (user_id, salon_id, date, time, status) VALUES (?, ?, ?, ?, ?)',
        [user_id, salon_id, date, time, status]
    );
    return rows;
}

exports.addAppointmentService = async (appointment_id, service_id) => {
    const [rows] = await db.query(
        'INSERT INTO appointment_services (appointment_id, service_id) VALUES (?, ?)',
        [appointment_id, service_id]
    );
    return rows;
} 

exports.getServicePrice = async (salon_id, service_id) => {
    const [rows] = await db.query(
        'SELECT price FROM salon_services WHERE salon_id = ? AND service_id = ?',
        [salon_id, service_id]
    );
    return  rows[0].price;
}