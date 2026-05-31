import express from "express";
import * as movieController from "./controllers/movieController.js";
import * as authController from "./controllers/authController.js";
import authenticate from "./middlewares/auth.js";
// src/router.js — tambahkan route upload
import upload from "./middlewares/upload.js";

const router = express.Router();

router.get("/", (_, res) => {
  return res.json("Welcome to my world~");
});

// Upload banner: auth + multer + controller
// upload.single('banner') = ekspektasi satu file di form field bernama "banner"
router.patch(
  "/movies/:id/banner",
  authenticate,
  upload.single("banner"),
  movieController.uploadBanner,
);

// -- AUTH (public routes, tidak perlu token)
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

// -- STUDENTS (semua butuh token: authenticate sebagai middleware) --
router.get("/movies", authenticate, movieController.getAll);
router.get("/movies/:id", authenticate, movieController.getById);
router.post("/movies", authenticate, movieController.create);
router.patch("/movies/:id", authenticate, movieController.update);
router.delete("/movies/:id", authenticate, movieController.remove);

export default router;
