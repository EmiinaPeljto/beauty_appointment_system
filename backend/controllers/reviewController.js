const reviewModel = require('../models/reviewModel');

exports.addReview = async (req, res) => {
    try {
        const { salon_id } = req.params;
        const { rating, review_text } = req.body;
        const result = await reviewModel.addReview(salon_id, rating, review_text);
        res.status(201).json({ message: 'Review added successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error: error.message });
    }
}

exports.getReviewBySalonId = async (req, res) => {
    try {
        const { salon_id } = req.params;
        const reviews = await reviewModel.getReviewBySalonId(salon_id);
        res.status(200).json({ message: 'Reviews fetched successfully', data: reviews });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
}

exports.averageRating = async (req, res) => {
    try {
        const { salon_id } = req.params;
        const averageRating = await reviewModel.averageRating(salon_id);
        res.status(200).json({ message: 'Average rating fetched successfully', data: averageRating });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching average rating', error: error.message });
    }
}

