const db = require("../config/db");

exports.addReview = async (salon_id, user_id, rating, review_text) => {
  const [rows] = await db.query(
    "INSERT INTO reviews (salon_id, user_id, rating, review_text) VALUES (?, ?, ?, ?)",
    [salon_id, user_id, rating, review_text]
  );
  return rows;
};
exports.getReviewById = async (review_id) => {
  const [rows] = await db.query("SELECT * FROM reviews WHERE id = ?", [
    review_id,
  ]);
  return rows.length > 0 ? rows[0] : null;
};

// Update the deleteReview function for better error handling:
exports.deleteReview = async (review_id) => {
  try {
    // Perform deletion
    const [result] = await db.query("DELETE FROM reviews WHERE id = ?", [
      review_id,
    ]);

    if (result.affectedRows === 0) {
      throw new Error("Failed to delete review");
    }

    return true;
  } catch (error) {
    console.error("Database error during review deletion:", error);
    throw error;
  }
};

exports.getReviewBySalonId = async (salon_id) => {
  const [rows] = await db.query(
    `SELECT 
            r.id,
            r.user_id,
            CONCAT(u.first_name, ' ', u.last_name) AS user_name, 
            u.profile_image, 
            r.rating, 
            r.review_text, 
            r.created_at 
        FROM salons s 
        JOIN reviews r ON s.id = r.salon_id 
        LEFT JOIN users u ON u.id = r.user_id 
        WHERE r.salon_id = ?
        ORDER BY r.created_at DESC`,
    [salon_id]
  );
  return rows;
};

exports.averageRating = async (salon_id) => {
  const [rows] = await db.query(
    "SELECT ROUND(AVG(r.rating), 1) AS average_rating FROM reviews r JOIN salons s ON s.id = r.salon_id WHERE r.salon_id = ?",
    [salon_id]
  );
  return rows[0].average_rating;
};
