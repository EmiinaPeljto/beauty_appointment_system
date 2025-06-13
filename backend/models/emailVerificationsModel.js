const db = require("../config/db");

exports.createEmailVerification = async (code, expiresAt, payload) => {
  const [rows] = await db.query(
    `INSERT INTO email_verifications (code, expires_at, payload) VALUES (?, ?, ?)`,
    [code, expiresAt, payload]
  );
  return rows;
};

exports.getLatestEmailVerification = async (email, code) => {
  const [rows] = await db.query(
    `SELECT * FROM email_verifications WHERE JSON_EXTRACT(payload, '$.email') = ? AND code = ? ORDER BY created_at DESC LIMIT 1`,
    [email, code]
  );
  return rows[0];
};

exports.updateEmailVerification = async (id, fields) => {
  const sets = [];
  const values = [];
  for (const key in fields) {
    sets.push(`${key} = ?`);
    values.push(fields[key]);
  }
  values.push(id);
  await db.query(
    `UPDATE email_verifications SET ${sets.join(", ")} WHERE id = ?`,
    values
  );
};

exports.markUserEmailVerified = async (userId) => {
  await db.query(`UPDATE users SET verified = 1 WHERE id = ?`, [userId]);
};
