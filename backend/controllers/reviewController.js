const reviewModel = require("../models/reviewModel");

exports.addReview = async (req, res) => {
  try {
    const { rating, review_text, user_id } = req.body;
    const { salon_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    await reviewModel.addReview(salon_id, user_id, rating, review_text);
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add review", error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { review_id } = req.params;

    console.log(
      `Controller: Delete request for review ID ${review_id} `
    );

    

    if (!review_id) {
      console.log("Missing review_id in request params");
      return res.status(400).json({ message: "Review ID is required" });
    }

    try {
      await reviewModel.deleteReview(review_id, );
      console.log(`Review ${review_id} deleted successfully`);
      return res.status(200).json({ message: "Review deleted successfully" });
    } catch (modelError) {
      console.error("Model error:", modelError.message);

      // Check for specific error types
      if (
        modelError.message.includes("not found") ||
        modelError.message.includes("permission")
      ) {
        return res.status(403).json({ message: modelError.message });
      }

      throw modelError; // Re-throw for the outer catch block
    }
  } catch (error) {
    console.error("Controller error deleting review:", error);
    return res.status(500).json({
      message: "Failed to delete review",
      error: error.message,
    });
  }
};

exports.getReviewBySalonId = async (req, res) => {
  try {
    const { salon_id } = req.params;
    const reviews = await reviewModel.getReviewBySalonId(salon_id);
    res
      .status(200)
      .json({ message: "Reviews fetched successfully", data: reviews });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reviews", error: error.message });
  }
};

exports.averageRating = async (req, res) => {
  try {
    const { salon_id } = req.params;
    const averageRating = await reviewModel.averageRating(salon_id);
    res.status(200).json({
      message: "Average rating fetched successfully",
      data: averageRating,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching average rating", error: error.message });
  }
};
