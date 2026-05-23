// REPO GUNANYA HANYA UNTUK HANDLE KOMUNIKASI DENGAN SQL DATABASE
import pool from "../db.js";

const findAll = async () => {
  const result = await pool.query("SELECT * FROM movies ORDER BY id ASC");
  console.log("findAll", result);
  return result.rows;
};

const findById = async (id) => {
  const result = await pool.query("SELECT * FROM movies WHERE id = $1", [id]);
  console.log("findbyid", result);
  return result.rows[0];
};

const create = async ({
  title,
  banner,
  poster,
  rating,
  age_rating,
  description,
  casts,
  created_by,
  duration,
  is_premium,
}) => {
  const query =
    "INSERT INTO movies (title, banner, poster, rating, age_rating, description, casts, created_by, duration, is_premium) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
  console.log("create => query", query);
  const result = await pool.query(query, [
    title,
    banner,
    poster,
    rating,
    age_rating,
    description,
    casts,
    created_by,
    duration,
    is_premium,
  ]);
  console.log("create => result", result);
  return result.rows[0];
};

const update = async (id, data) => {
  const {
    title,
    banner,
    poster,
    rating,
    age_rating,
    description,
    casts,
    created_by,
    duration,
    is_premium,
  } = data;

  const query =
    "UPDATE movies SET title = COALESCE($2, title), banner = COALESCE($3, banner), poster = COALESCE($4, poster), rating = COALESCE($5, rating), age_rating = COALESCE($6, age_rating), description = COALESCE($7, description), casts = COALESCE($8, casts), created_by = COALESCE($9, created_by), duration = COALESCE($10, duration), is_premium = COALESCE($11, is_premium) WHERE id = $1 RETURNING *";
  console.log("update => query", query);
  const result = await pool.query(query, [
    id,
    title,
    banner,
    poster,
    rating,
    age_rating,
    description,
    casts,
    created_by,
    duration,
    is_premium,
  ]);
  console.log("update => result", result);
  return result.rows[0];
};

const deleteById = async (id) => {
  const result = await pool.query(
    "DELETE FROM movies WHERE id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
};

export { findAll, findById, create, update, deleteById };
