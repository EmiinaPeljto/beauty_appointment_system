const salonModel = require('../models/salonModels');
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

        res.status(200).json({availableDates});
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

        const dayOfWeek = moment(date, "YYYY-MM-DD").day(); // Get the day of the week (0-6) for the given date
        const workingHours = await salonModel.getAvailableTimeSlots(salon_id, dayOfWeek);

        if (!workingHours || !workingHours[0] || !workingHours[0].open_time || !workingHours[0].close_time) {
            return res.status(404).json({ message: "Working hours not found or invalid for this salon and day" });
        }

        const { open_time, close_time } = workingHours[0];
        const slotInterval = await salonModel.getSlotInterval(salon_id);

        if (!slotInterval || isNaN(slotInterval)) {
            return res.status(400).json({ message: "Invalid slot interval for this salon" });
        }

        const slots = [];
        let start = moment(`${date} ${open_time}`, "YYYY-MM-DD HH:mm:ss");
        const end = moment(`${date} ${close_time}`, "YYYY-MM-DD HH:mm:ss");

        console.log("Start time:", start.format("YYYY-MM-DD HH:mm:ss"));
        console.log("End time:", end.format("YYYY-MM-DD HH:mm:ss"));

        while (start.isBefore(end)) {
            slots.push(start.format("HH:mm"));
            start.add(slotInterval, "minutes"); // Add the slot interval to the start time
        }

        res.status(200).json({ slots });
    } catch (error) {
        console.error("Error fetching available time slots:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};