const express = require("express");
const router = express.Router();
const supportRequestController = require("../../../../controllers/supportRequestController");



//add support request route
router.post("/add", supportRequestController.addSupportRequest);

module.exports = router;
