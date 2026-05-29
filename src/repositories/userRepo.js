import pool from "../db.js";

const findAll = async () => {
  const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
  console.log(`users findAll: ${result}`);
  return result.rows;
};

const findById = async (id) => {
  const result = await pool.query("SElECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};
