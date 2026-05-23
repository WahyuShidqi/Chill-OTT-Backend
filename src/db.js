// file ini untuk koneksi ke databasenya
import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

console.log(
  process.env.DB_HOST,
  process.env.DB_PORT,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_NAME,
);

pool.connect((err, _, release) => {
  if (err) {
    return console.warn("Gagal koneksi ke database", err);
  }
  console.log("Koneksi database berhasil");
  release(); //untuk testing aja. gunanya untuk release koneksi yang ada di memory
});

export default pool;
