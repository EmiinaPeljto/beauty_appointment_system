const express = require('express');
const router = express.Router();
const appointmentController = require('../../../../controllers/appointmentControllers');


router.get('/getAppointmentsByStatus/:user_id/:status', appointmentController.getAppointmentsByStatus);
router.post('/makeAnAppointment', appointmentController.createAppointment);
router.get('/price/:salon_id/:service_id', appointmentController.getServicePrice);

module.exports = router;