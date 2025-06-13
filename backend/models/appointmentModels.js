const db = require("../config/db");

exports.getAppointmentsByStatus = async (user_id, status) => {
  const [rows] = await db.query(
    "SELECT a.id, a.date, a.time, a.status, s.name AS salon_name, s.location FROM appointments a JOIN salons s ON a.salon_id = s.id WHERE a.user_id = ? AND a.status = ?",
    [user_id, status]
  );
  return rows;
};

exports.createAppointment = async (user_id, salon_id, date, time, status) => {
  const [rows] = await db.query(
    "INSERT INTO appointments (user_id, salon_id, date, time, status) VALUES (?, ?, ?, ?, ?)",
    [user_id, salon_id, date, time, status]
  );
  return rows;
};

exports.addAppointmentService = async (appointment_id, service_id) => {
  const [rows] = await db.query(
    "INSERT INTO appointment_services (appointment_id, service_id) VALUES (?, ?)",
    [appointment_id, service_id]
  );
  return rows;
};

exports.getServicePrice = async (salon_id, service_id) => {
  const [rows] = await db.query(
    "SELECT price FROM salon_services WHERE salon_id = ? AND service_id = ?",
    [salon_id, service_id]
  );
  return rows[0].price;
};

//////////////// Cancel Appointment //////////////////

exports.cancelAppointment = async (appointment_id, user_id) => {
  const [rows] = await db.query(
    "UPDATE appointments SET status = 'canceled' WHERE id = ? AND user_id = ?",
    [appointment_id, user_id]
  );
  return rows.affectedRows > 0; 
};

exports.getAppointmentById = async(appointment_id, user_id) => {
  const [rows] = await db.query(
    "SELECT * FROM appointments where id = ? AND user_id = ?",
    [appointment_id, user_id]
  );
  return rows[0];
};