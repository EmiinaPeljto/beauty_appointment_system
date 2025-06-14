const crypto = require('crypto');
const db = require('../config/db');


exports.getAllUsers = async ()=> {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
};

exports.register = async (first_name, last_name, email, phone_number, password ) => {
    const [rows] = await db.query(
        'INSERT INTO users (first_name, last_name, email, phone_number, password, verified) VALUES (?, ?, ?, ?, ?, 0)',
        [first_name, last_name, email, phone_number, password]
    );
    return rows;
};

exports.login = async (email) => {
    const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password]
    );
    return rows[0]; // Return the first matching user
};

exports.getUserByEmail = async (email) => {
    const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );
    return rows[0]; 
};

exports.getUsersFullName = async (id) => {
    const [rows] = await db.query (
        'SELECT CONCAT(first_name, " ", last_name) AS full_name FROM users WHERE id = ?',
        [id]
    );
    return rows;
}

exports.getUserById = async (id) => {
    const [rows] = await db.query (
        'SELECT * FROM users WHERE id = ?',
        [id]
    );
    return rows[0]; // Return the first matching user
};

///////////////// Forgot password //////////////////

exports.createPasswordResetToken = async function (userId) {
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await db.query(
        `INSERT INTO password_resets (user_id, reset_token, expires_at) VALUES (?, ?, ?)`,
        [userId, tokenHash, expiresAt]
    );
    return token;
};

exports.validatePasswordResetToken = async function(token) {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const [rows] = await db.query(
        `SELECT * FROM password_resets WHERE reset_token = ? AND expires_at > NOW() AND used = 0`,
        [tokenHash]
    );
    return rows[0];
};

exports.markTokenUsed = async function (tokenId) {
    await db.query(
        `UPDATE password_resets SET used = 1 WHERE id = ?`,
        [tokenId]
    );
};

exports.logResetAttempt = async function (userId, email) {
    await db.query (
        `INSERT INTO password_reset_attempts (user_id, email) VALUES (?, ?)`,
        [userId, email]
    );
};

exports.countResetAttempts = async function (userId) {
    const [longTerm] = await db.query (
        `SELECT COUNT (*) as count FROM password_reset_attempts WHERE user_id = ?`,
        [userId]
    );
    const [shortTerm] = await db.query (
        `SELECT COUNT(*) as count FROM password_reset_attempts WHERE user_id = ? AND attempted_at > DATE_SUB(NOW(), INTERVAL 2 MINUTE)`,
        [userId]
    );
    return {
        longTerm: longTerm[0].count,
        shortTerm: shortTerm[0].count
    };
};

exports.clearResetAttempts = async function (userId) {
    await db.query( 
        `DELETE FROM password_reset_attempts WHERE user_id = ?`,
        [userId]
    );
};

exports.updatePasswordById = async function (userId, hashedPassword) {
    await db.query(
        `UPDATE users SET password = ? WHERE id = ?`,
        [hashedPassword, userId]
    );
};

//////////////// Email verification ////////////////
exports.updateUserVerifiedByEmail = async (email) => {
    await db.query(
        `UPDATE users SET verified = 1 WHERE email = ?`,
        [email]
    );
};