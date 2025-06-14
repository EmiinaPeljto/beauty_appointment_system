const salonModel = require("../models/salonModels");
const moment = require("moment");

exports.getSalonsByCategory = async (req, res) => {
  try {
    const category_id = req.params.category_id; // Assuming category_id is passed as a URL parameter
    const salons = await salonModel.getSalonsByCategory(category_id);
    res.json(salons);
  } catch (error) {
    console.error("Error fetching salons:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSalonById = async (req, res) => {
  try {
    const salon_id = req.params.salon_id;
    const salon = await salonModel.getSalonById(salon_id);
    if (!salon) {
      return res.status(404).json({ message: "Salon not found" });
    }
    res.json(salon);
  } catch (error) {
    console.error("Error fetching salon:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAvailableDates = async (req, res) => {
  try {
    const salon_id = req.params.salon_id;
    const openDays = await salonModel.getAvailableDates(salon_id);

    const availableDates = [];
    const today = moment();
    const endOfMonth = moment().endOf("month");
    const currentDate = moment(today);

    while (currentDate.isSameOrBefore(endOfMonth)) {
      const dayOfWeek = currentDate.day();

      if (openDays.includes(dayOfWeek)) {
        availableDates.push(currentDate.format("YYYY-MM-DD"));
      }

      currentDate.add(1, "days");
    }

    res.status(200).json({ availableDates });
  } catch (error) {
    console.error("Error fetching available dates:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAvailableTimeSlots = async (req, res) => {
  try {
    const { salon_id, date } = req.params;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const dayOfWeek = moment(date, "YYYY-MM-DD").day();
    const workingHours = await salonModel.getAvailableTimeSlots(
      salon_id,
      dayOfWeek
    );

    if (
      !workingHours ||
      !workingHours[0] ||
      !workingHours[0].open_time ||
      !workingHours[0].close_time
    ) {
      return res
        .status(404)
        .json({
          message: "Working hours not found or invalid for this salon and day",
        });
    }

    const { open_time, close_time } = workingHours[0];
    const slotInterval = await salonModel.getSlotInterval(salon_id);

    if (!slotInterval || isNaN(slotInterval)) {
      return res
        .status(400)
        .json({ message: "Invalid slot interval for this salon" });
    }

    // 1. Generate all possible slots
    const slots = [];
    let start = moment(`${date} ${open_time}`, "YYYY-MM-DD HH:mm:ss");
    const end = moment(`${date} ${close_time}`, "YYYY-MM-DD HH:mm:ss");

    while (start.isBefore(end)) {
      slots.push(start.format("HH:mm"));
      start.add(slotInterval, "minutes");
    }

    // 2. Fetch booked times using the model
    const bookedRows = await salonModel.getBookedTimes(salon_id, date);
    const bookedTimes = bookedRows.map((row) =>
      moment(row.time, "HH:mm:ss").format("HH:mm")
    );

    // 3. Filter out booked slots
    const now = moment();
    const isToday = now.format("YYYY-MM-DD") === date;

    const availableSlots = slots.filter((slot) => {
      if (bookedTimes.includes(slot)) return false;
      if (isToday) {
        const slotTime = moment(`${date} ${slot}`, "YYYY-MM-DD HH:mm");
        return slotTime.isAfter(now);
      }
      return true;
    });

    res.status(200).json({ slots: availableSlots });
  } catch (error) {
    console.error("Error fetching available time slots:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getBestRatedSalons = async (req, res) => {
  try {
    const bestRatedSalons = await salonModel.getBestRatedSalons();
    res.status(200).json(bestRatedSalons);
  } catch (error) {
    console.error("Error fetching best-rated salons:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getWorkingHoursBySalon = async (req, res) => {
  try {
    const salon_id = req.params.salon_id;
    const hours = await salonModel.getWorkingHoursBySalonId(salon_id);
    res.json(hours);
  } catch (error) {
    res.status(500).json({ message: "Error fetching working hours" });
  }
};
