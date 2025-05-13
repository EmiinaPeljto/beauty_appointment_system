const db = require('../config/db');


exports.addSupportRequest = async (userId, subject, message) => {
    const [rows] = await db.query(
        'INSERT INTO support_requests (user_id, subject, message, created_at) VALUES (?, ?, ?, NOW())',
        [userId, subject, message]
    );
    return rows;
}