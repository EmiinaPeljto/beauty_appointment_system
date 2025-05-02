const db = require("../config/db");

exports.getServicesBySalon = async (salon_id) => {
  const [rows] = await db.query(
    "SELECT sc.name AS 'category_name', s2.name , ss.duration , ss.price  FROM salons s JOIN salon_services ss ON s.id = ss.salon_id JOIN services s2 ON ss.service_id = s2.id JOIN service_categories sc ON s2.service_category_id = sc.id WHERE ss.salon_id = ?;",
    [salon_id]
  );
  return rows;
};
