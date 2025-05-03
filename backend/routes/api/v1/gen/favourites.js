const express = require("express");
const router = express.Router();
const favouritesController = require("../../../../controllers/favouritesController");

// Route to get favorites by user ID
router.get("/getFavoritesByUserId/:user_id", favouritesController.getFavoritesByUserId);

// Route to delete a favourite by user ID and salon ID
router.delete("/deleteFavouriteById/:user_id/:salon_id", favouritesController.deleteFavouriteById);

module.exports = router;