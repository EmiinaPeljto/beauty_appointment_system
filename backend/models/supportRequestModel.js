const db = require('../config/db');

exports.addSupportRequest = async (subject, message) => {
    const [rows] = await db.query(
        'INSERT INTO support_requests (subject, message) VALUES (?, ?)',
        [subject, message]
    );
    return rows;
}