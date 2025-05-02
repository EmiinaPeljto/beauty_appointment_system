const express = require('express');
const router = express.Router();
const salonController = require('../../../../controllers/salonControllers');

// Route to get a salon by its ID
router.get('/salonById/:salon_id', salonController.getSalonById);

// Route to get salons by category ID
router.get('/salonsByCategory/:category_id', salonController.getSalonsByCategory);

module.exports = router;