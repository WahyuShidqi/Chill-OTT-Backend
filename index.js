import "dotenv/config";
import express from "express";
import router from "./src/router.js";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());
app.use(cors());

// Setup __dirname untuk cek path file (dibutuhkan untuk static file uploads)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve folder /uploads sebagai static file
// Artinya file di uploads/ bisa diakses via: http://localhost:3000/uploads/namafile.jpg
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// end of setup static file

app.use("/", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
