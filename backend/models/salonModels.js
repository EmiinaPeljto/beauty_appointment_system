const db = require('../config/db');

exports.getSalonsByCategory = async (category_id) => {
    const [rows] = await db.query('SELECT c.title , s.image , s.name , s.location  FROM salons s JOIN salon_categories sc ON s.id = sc.salon_id JOIN categories c ON sc.category_id = c.id WHERE c.id = ?', 
        [category_id]
    );
    return rows;
};