const express = require('express');
const router = express.Router();
const salonController = require('../../../../controllers/salonControllers');

// Route to get a salon by its ID
router.get('/salonById/:salon_id', salonController.getSalonById);

// Route to get salons by category ID
router.get('/salonsByCategory/:category_id', salonController.getSalonsByCategory);

// Route to get available dates for a salon
router.get('/availableDates/:salon_id', salonController.getAvailableDates);

// Route to get available time slots for a salon on a specific date
router.get('/availableTimeSlots/:salon_id/:date', salonController.getAvailableTimeSlots);

// Route to get the slot interval for a salon
//router.get('/slotInterval/:salon_id', salonController.getSlotInterval);

// Route to get the best-rated salons
router.get('/bestRatedSalons', salonController.getBestRatedSalons);

// Route to get all salons
router.get("/workingHours/:salon_id", salonController.getWorkingHoursBySalon);

module.exports = router;