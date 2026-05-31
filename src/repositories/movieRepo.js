// // REPO GUNANYA HANYA UNTUK HANDLE KOMUNIKASI DENGAN SQL DATABASE
// import pool from "../db.js";

// const findAll = async ({
//   search,
//   sortBy = "id",
//   order = "asc",
//   page = 1,
//   limit = 10,
// } = {}) => {
//   const allowedSort = ["id", "title"];
//   const safeSortBy = allowedSort.includes(sortBy) ? sortBy : "id";
//   const safeOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

//   const values = [];
//   let where = "";

//   if (search) {
//     values.push(`%${search}%`);
//     where = `WHERE title ILIKE $${values.length}`;
//   }

//   const offset = (page - 1) * limit;
//   values.push(limit, offset);

//   const sql = `SELECT * FROM movies ${where} ORDER BY ${safeSortBy} ${safeOrder} LIMIT $${values.length - 1} OFFSET $${values.length}`;

//   const result = await pool.query(sql, values);
//   return result.rows;
// };

// const countAll = async (search) => {
//   const values = [];
//   let where = "";

//   if (search) {
//     values.push(`%${search}%`);
//     where = `WHERE title ILIKE $1`;
//   }

//   const result = await pool.query(
//     `SELECT COUNT(*) FROM movies ${where}`,
//     values,
//   );
//   return parseInt(result.rows[0].count, 10);
// };

// const findById = async (id) => {
//   const result = await pool.query("SELECT * FROM movies WHERE id = $1", [id]);
//   console.log("findbyid", result);
//   return result.rows[0];
// };

// const create = async ({
//   title,
//   banner,
//   poster,
//   rating,
//   age_rating,
//   description,
//   casts,
//   created_by,
//   duration,
//   is_premium,
// }) => {
//   const query =
//     "INSERT INTO movies (title, banner, poster, rating, age_rating, description, casts, created_by, duration, is_premium) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
//   console.log("create => query", query);
//   const result = await pool.query(query, [
//     title,
//     banner,
//     poster,
//     rating,
//     age_rating,
//     description,
//     casts,
//     created_by,
//     duration,
//     is_premium,
//   ]);
//   console.log("create => result", result);
//   return result.rows[0];
// };

// // const update = async (id, data) => {
// //   const {
// //     title,
// //     banner,
// //     poster,
// //     rating,
// //     age_rating,
// //     description,
// //     casts,
// //     created_by,
// //     duration,
// //     is_premium,
// //   } = data;

// //   const query =
// //     "UPDATE movies SET title = COALESCE($2, title), banner = COALESCE($3, banner), poster = COALESCE($4, poster), rating = COALESCE($5, rating), age_rating = COALESCE($6, age_rating), description = COALESCE($7, description), casts = COALESCE($8, casts), created_by = COALESCE($9, created_by), duration = COALESCE($10, duration), is_premium = COALESCE($11, is_premium) WHERE id = $1 RETURNING *";
// //   console.log("update => query", query);
// //   const result = await pool.query(query, [
// //     id,
// //     title,
// //     banner,
// //     poster,
// //     rating,
// //     age_rating,
// //     description,
// //     casts,
// //     created_by,
// //     duration,
// //     is_premium,
// //   ]);
// //   console.log("update => result", result);
// //   return result.rows[0];
// // };

// const update = async (
//   id,
//   title,
//   banner,
//   poster,
//   rating,
//   age_rating,
//   description,
//   casts,
//   created_by,
//   duration,
//   is_premium,
// ) => {
//   const query = `UPDATE movies
//   SET title = $1, banner = COALESCE($2, banner), poster = $3, rating = $4, age_rating = $5, description = $6, casts = $7, created_by = $8, duration = $9, is_premium = $10
//   WHERE id = $11 RETURNING *`;
//   const values = [
//     title,
//     banner,
//     poster,
//     rating,
//     age_rating,
//     description,
//     casts,
//     created_by,
//     duration,
//     is_premium,
//     id,
//   ];
//   const result = await pool.query(query, values);
//   return result.rows[0];
// };

// const deleteById = async (id) => {
//   const result = await pool.query(
//     "DELETE FROM movies WHERE id = $1 RETURNING *",
//     [id],
//   );
//   return result.rows[0];
// };

// export { findAll, countAll, findById, create, update, deleteById };

import prisma from "../prismaClient.js";

const findAll = async ({
  search,
  sortBy = "id",
  order = "asc",
  page = 1,
  limit = 10,
} = {}) => {
  const allowedSort = ["id", "title"];
  const safeSortBy = allowedSort.includes(sortBy) ? sortBy : "id";
  const safeOrder = order.toLowerCase() === "desc" ? "desc" : "asc";

  const where = search
    ? {
        title: {
          contains: search,
          mode: "insensitive",
        },
      }
    : {};

  const result = await prisma.movie.findMany({
    where,
    orderBy: {
      [safeSortBy]: safeOrder,
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  return result;
};

const countAll = async (search) => {
  const where = search
    ? {
        title: {
          contains: search,
          mode: "insensitive",
        },
      }
    : {};

  const result = await prisma.movie.count({
    where,
  });

  return result;
};

const findById = async (id) => {
  const result = await prisma.movie.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return result;
};

const create = async ({
  title,
  banner,
  poster,
  rating,
  ageRating,
  description,
  casts,
  createdBy,
  duration,
  isPremium,
}) => {
  const result = await prisma.movie.create({
    data: {
      title,
      banner,
      poster,
      rating,
      ageRating,
      description,
      casts,
      createdBy,
      duration,
      isPremium,
    },
  });

  return result;
};

const update = async (
  id,
  title,
  banner,
  poster,
  rating,
  ageRating,
  description,
  casts,
  createdBy,
  duration,
  isPremium,
) => {
  const result = await prisma.movie.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title,
      banner,
      poster,
      rating,
      ageRating,
      description,
      casts,
      createdBy,
      duration,
      isPremium,
    },
  });

  return result;
};

const deleteById = async (id) => {
  const result = await prisma.movie.delete({
    where: {
      id: parseInt(id),
    },
  });

  return result;
};

export { findAll, countAll, findById, create, update, deleteById };
