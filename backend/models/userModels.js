const db = require('../config/db');

exports.getAllUsers = async ()=> {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
};

exports.register = async (first_name, last_name, email, phone_number, password) => {
    const [rows] = await db.query(
        'INSERT INTO users (first_name, last_name, email, phone_number, password) VALUES (?, ?, ?, ?, ?)',
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