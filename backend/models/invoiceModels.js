const db = require("../config/db");

exports.getInvoice = async (appointment_id) => {
  const [rows] = await db.query(
    `SELECT 
    s.name AS salon_name,
    a.date,
    a.time,
    u.first_name,
    u.last_name,
    u.phone_number,
    u.email,
    s.location,
    GROUP_CONCAT(s2.name SEPARATOR ', ') AS service_names,
    MAX(i.total_price) AS total_price
FROM appointments a
JOIN users u ON u.id = a.user_id
JOIN salons s ON a.salon_id = s.id
JOIN appointment_services as2 ON a.id = as2.appointment_id
JOIN services s2 ON as2.service_id = s2.id
JOIN salon_services ss ON ss.salon_id = s.id AND ss.service_id = s2.id
JOIN invoice i ON a.id = i.appointment_id
WHERE a.id = 1
GROUP BY a.id;`,
    [appointment_id]
  );
  return rows[0];
};
