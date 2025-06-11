const db = require("../config/db");

exports.getServicesBySalon = async (salon_id) => {
  const [rows] = await db.query(
    `SELECT 
        sc.name AS category_name, 
        s2.id AS id,  /* <<< ADD THIS LINE TO SELECT THE SERVICE ID */
        s2.name AS name, /* Alias s2.name to name for clarity */
        ss.duration, 
        ss.price  
     FROM 
        salons s 
     JOIN 
        salon_services ss ON s.id = ss.salon_id 
     JOIN 
        services s2 ON ss.service_id = s2.id 
     JOIN 
        service_categories sc ON s2.service_category_id = sc.id 
     WHERE 
        ss.salon_id = ?`,
    [salon_id]
  );
  console.log("Services from DB for salon_id", salon_id, ":", rows);
  return rows;
};
