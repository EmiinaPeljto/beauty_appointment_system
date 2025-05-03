const express = require("express");
const router = express.Router();
const appointmentController = require("../../../../controllers/invoiceController");

router.get("/getInvoice/:appointment_id", appointmentController.getInvoice);

module.exports = router;
