const db = require('../config/db');

exports.addReview = async (salon_id, rating, review_text) => {
    const [rows] = await db.query(
        'INSERT INTO reviews (salon_id, rating, review_text) VALUES (?, ?, ?)',
        [salon_id, rating, review_text]
      );
      return rows;
}

exports.getReviewBySalonId = async (salon_id) => {
    const [rows] = await db.query (
        'SELECT u.profile_image, r.rating , r.review_text , r.created_at FROM salons s JOIN reviews r ON s.id = r.salon_id JOIN users u ON u.id = r.user_id WHERE r.salon_id = ?',
        [salon_id]
    );
    return rows;
}

exports.averageRating = async (salon_id) => {
    const [rows] = await db.query (
        'SELECT ROUND(AVG(r.rating), 1) AS average_rating FROM reviews r JOIN salons s ON s.id = r.salon_id WHERE r.salon_id = ?',
        [salon_id]
    );
    return rows[0].average_rating;
}