const appointmentModel = require("../models/appointmentModels");
const invoiceModel = require("../models/invoiceModels");
const db = require("../config/db");

exports.getAppointmentsByStatus = async (req, res) => {
  try {
    const { user_id, status } = req.params;
    if (!user_id || !status) {
      return res
        .status(400)
        .json({ message: "User ID and status are required." });
    }
    const appointments = await appointmentModel.getAppointmentsByStatus(
      user_id,
      status
    );
    if (!appointments) {
      // Model returns rows, which could be an empty array
      return res
        .status(404)
        .json({ message: "No appointments found for this user and status." });
    }
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments by status:", error);
    res
      .status(500)
      .json({ message: "Internal server error while fetching appointments." });
  }
};

exports.createAppointment = async (req, res) => {
  const { user_id, salon_id, date, time, service_id } = req.body;

  if (
    !user_id ||
    !salon_id ||
    !date ||
    !time ||
    !service_id ||
    !Array.isArray(service_id) ||
    service_id.length === 0
  ) {
    return res
      .status(400)
      .json({ message: "Missing required fields or invalid service_id." });
  }

  let connection;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    // 1. Create Appointment
    const appointmentResult = await appointmentModel.createAppointment(
      user_id,
      salon_id,
      date,
      time,
      "upcoming"
    );
    const appointment_id = appointmentResult.insertId;

    if (!appointment_id) {
      throw new Error("Failed to create appointment.");
    }

    // 2. Add Appointment Services and Calculate Total Price
    let total_price = 0;
    for (const sid of service_id) {
      await appointmentModel.addAppointmentService(appointment_id, sid);
      const price = await appointmentModel.getServicePrice(
        salon_id,
        sid
      );
      total_price += Number(price);
      console.log("Total price: " + total_price);
    }

    // 3. Create Invoice
    await invoiceModel.createInvoice(appointment_id, total_price);

    await connection.commit();
    res.status(201).json({
      message: "Appointment booked successfully!",
      appointment_id: appointment_id,
      total_price: total_price,
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error("Error booking appointment:", error);
    if (error.message.startsWith("Service price not found")) {
      return res.status(404).json({ message: error.message });
    }
    res
      .status(500)
      .json({
        message: "Internal server error while booking appointment.",
        error: error.message,
      });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

exports.getServicePrice = async (req, res) => {
  const { salon_id, service_id } = req.params;

  if (!salon_id || !service_id) {
    return res
      .status(400)
      .json({ message: "Salon ID and service ID are required." });
  }

  try {
    const price = await appointmentModel.getServicePrice(salon_id, service_id);
    if (!price) {
      return res.status(404).json({ message: "Service price not found." });
    }
    res.status(200).json({ price: price });
  } catch (error) {
    console.error("Error fetching service price:", error);
    res
      .status(500)
      .json({ message: "Internal server error while fetching service price." });
  }
}
