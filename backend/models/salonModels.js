const db = require("../config/db");

exports.getSalonsByCategory = async (category_id) => {
  const [rows] = await db.query(
    "SELECT s.id, c.title , s.image , s.name , s.location  FROM salons s JOIN salon_categories sc ON s.id = sc.salon_id JOIN categories c ON sc.category_id = c.id WHERE c.id = ?",
    [category_id]
  );
  return rows;
};

exports.getSalonById = async (salon_id) => {
  const [rows] = await db.query(
    "SELECT group_concat(c.title SEPARATOR ', ') categories, s.*, round(avg(r.rating), 1) AS rating FROM categories c JOIN salon_categories sc ON c.id = sc.category_id JOIN salons s ON sc.salon_id = s.id JOIN reviews r ON s.id = r.salon_id WHERE s.id = ?",
    [salon_id]
  );
  return rows[0];
};

exports.getAvailableDates = async (salon_id) => {
  const [rows] = await db.query(
    "SELECT day_of_week FROM working_hours WHERE salon_id = ?",
    [salon_id]
  );
  return rows.map((row) => row.day_of_week);
};

exports.getAvailableTimeSlots = async (salon_id, day_of_week) => {
  const [rows] = await db.query(
    "SELECT open_time, close_time FROM working_hours WHERE salon_id = ? AND day_of_week = ?",
    [salon_id, day_of_week]
  );
  return rows; // Assuming only one row is returned for a specific salon and day_of_week
};

exports.getSlotInterval = async (salon_id) => {
  const [rows] = await db.query(
    "SELECT slot_interval_time FROM salon_settings WHERE salon_id = ?",
    [salon_id]
  );
  if (!rows || rows.length === 0) {
    throw new Error("No slot interval found for the given salon ID");
  }

  return rows[0].slot_interval_time; // Return the slot interval
};

exports.getBestRatedSalons = async () => {
  const [rows] = await db.query(
    "SELECT s.image, s.name , s.location ,round( avg(r.rating), 1) AS rating FROM reviews r JOIN salons s ON r.salon_id = s.id GROUP BY s.id ORDER BY avg (r.rating) DESC LIMIT 8",
    []
  );
  return rows; // Return the best-rated salons
};

exports.getWorkingHoursBySalonId = async (salon_id) => {
  const [rows] = await db.query(
    "SELECT * FROM working_hours WHERE salon_id = ?",
    [salon_id]
  );
  return rows;
};

exports.getBookedTimes = async (salon_id, date) => {
  const [rows] = await db.query(
    "SELECT time FROM appointments WHERE salon_id = ? AND date = ? AND status = 'upcoming'",
    [salon_id, date]
  );
  return rows;
};
