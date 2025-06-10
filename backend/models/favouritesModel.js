const db = require('../config/db');

exports.getFavouritesByUserId = async (user_id) => {
    const [rows] = await db.query(
        'SELECT s.id, s.image, s.name, s.location, avg(r.rating) AS rating FROM users u JOIN favorites f ON u.id = f.user_id JOIN salons s ON f.salon_id = s.id JOIN reviews r ON s.id = r.salon_id WHERE u.id = ? GROUP BY s.id',
        [user_id]
    );
    return rows;
}

exports.deleteFavouriteById = async (user_id, salon_id) => {
    const [rows] = await db.query(
        'DELETE FROM favorites WHERE user_id = ? AND salon_id = ?',
        [user_id, salon_id]
    );
    return rows;
}

exports.addFavourite = async (user_id, salon_id) => {
    const [rows] = await db.query(
        'INSERT INTO favorites (user_id, salon_id) VALUES (?, ?)',
        [user_id, salon_id]
    );
    return rows;
}

