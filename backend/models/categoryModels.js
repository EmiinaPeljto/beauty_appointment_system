const db = require("../config/db");

exports.getCategories = async () => {
    const [rows] = await db.query('SELECT c.title, c.description , c.image  FROM categories c');
    return rows;
}