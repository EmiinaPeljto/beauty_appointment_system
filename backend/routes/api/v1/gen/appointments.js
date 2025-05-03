const express = require('express');
const router = express.Router();
const appointmentController = require('../../../../controllers/appointmentControllers');

router.get('/getAppointmentsByStatus/:user_id/:status', appointmentController.getAppointmentsByStatus);

module.exports = router;