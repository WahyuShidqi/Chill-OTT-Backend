import pool from "../db.js";

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return result.rows[0];
};

const createUser = async (
  name,
  email,
  hashedPassword,
  role,
  avatar,
  is_deleted = false,
) => {
  try {
    const userResult = await pool.query(
      "INSERT INTO users (name, email, password, role, avatar, is_deleted) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, email, hashedPassword, role, avatar, is_deleted],
    );

    const user = userResult.rows[0];

    return user;
  } catch (error) {
    console.log("Error in  createUser", error);
    throw error;
  }
};

export { findUserByEmail, createUser };
