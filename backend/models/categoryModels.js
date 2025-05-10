const db = require("../config/db");

exports.getCategories = async () => {
    const [rows] = await db.query('SELECT *  FROM categories c');
    return rows;
}