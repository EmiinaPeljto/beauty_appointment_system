const express = require("express");
const router = express.Router();
const reviewController = require("../../../../controllers/reviewController");

// Route to add a review
router.post("/add/:salon_id", reviewController.addReview);

// Route to delete a review
router.delete("/delete/:review_id", reviewController.deleteReview);

// Route to get reviews by salon ID
router.get("/reviewBySalonId/:salon_id", reviewController.getReviewBySalonId);

// Route to get average rating by salon ID
router.get("/averageRating/:salon_id", reviewController.averageRating);

module.exports = router;