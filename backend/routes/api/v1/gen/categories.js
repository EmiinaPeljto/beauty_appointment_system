const express = require('express');
const router = express.Router();
const categoryController = require('../../../../controllers/categoryControllers');

router.get('/', categoryController.getCategories);

module.exports = router;