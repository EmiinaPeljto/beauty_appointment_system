const express = require("express");
const router = express.Router();
const supportRequestController = require("../../../../controllers/supportRequestController");
const { authenticateToken } = require("../../../../middleware/authMiddleware");

// Add support request route - protected by authentication
router.post("/add", authenticateToken, supportRequestController.addSupportRequest);

module.exports = router;
