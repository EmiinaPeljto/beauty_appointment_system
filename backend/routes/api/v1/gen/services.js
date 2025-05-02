const serviceConroller = require('../../../../controllers/serviceControllers');
const express = require('express');
const router = express.Router();

// Route to get services by salon ID
router.get('/servicesBySalon/:salon_id', serviceConroller.getServicesBySalon);

module.exports = router;