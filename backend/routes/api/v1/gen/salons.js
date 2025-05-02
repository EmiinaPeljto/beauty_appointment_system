const express = require('express');
const router = express.Router();
const salonController = require('../../../../controllers/salonControllers');

// Route to get all salons
router.get('/salonsByCategory/:category_id', salonController.getSalonsByCategory);

module.exports = router;