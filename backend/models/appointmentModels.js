const db = require("../config/db");

const APPOINTMENT_STATUS = {
  UPCOMING: "Upcoming",
  COMPLETED: "Completed",
  CANCELLED: "cancelled",
};

exports.getAppointmentsByStatus = async (user_id, status) => {
  const [rows] = await db.query(
    "SELECT a.id, a.date, a.time, a.status, s.name AS salon_name, s.location FROM appointments a JOIN salons s ON a.salon_id = s.id WHERE a.user_id = ? AND a.status = ?",
    [user_id, status]
  );
  return rows;
};

async function retryOperation(operation, maxRetries = 3, delay = 1000) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (err) {
      console.log(`Attempt ${attempt} failed: ${err.message}`);
      lastError = err;

      if (err.code !== "ER_LOCK_WAIT_TIMEOUT" || attempt >= maxRetries) {
        throw err;
      }

      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }

  throw lastError;
}

exports.updatePastAppointments = async () => {
  try {
    // 1. First get IDs of appointments that need updating (small batch)
    const [appointments] = await db.query(
      "SELECT id FROM appointments WHERE status = ? AND DATE(date) < ? LIMIT 20",
      [APPOINTMENT_STATUS.UPCOMING, new Date().toISOString().split("T")[0]]
    );

    // 2. If no appointments need updating, return early
    if (appointments.length === 0) {
      return 0;
    }

    // 3. Extract just the IDs
    const appointmentIds = appointments.map((a) => a.id);

    // 4. Update in smaller batches to avoid lock contention
    let updatedCount = 0;
    const batchSize = 5;

    for (let i = 0; i < appointmentIds.length; i += batchSize) {
      const batch = appointmentIds.slice(i, i + batchSize);
      try {
        const [result] = await db.query(
          "UPDATE appointments SET status = ? WHERE id IN (?) AND status = ?",
          [APPOINTMENT_STATUS.COMPLETED, batch, APPOINTMENT_STATUS.UPCOMING]
        );

        updatedCount += result.affectedRows;
        // Small delay between batches to reduce contention
        if (i + batchSize < appointmentIds.length) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      } catch (err) {
        // Error handling retained but without logging
      }
    }

    return updatedCount;
  } catch (error) {
    // Error handling retained but without logging
    return 0; // Return 0 updates on error
  }
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

exports.getAppointmentById = async (appointment_id, user_id) => {
  const [rows] = await db.query(
    "SELECT * FROM appointments where id = ? AND user_id = ?",
    [appointment_id, user_id]
  );
  return rows[0];
};
