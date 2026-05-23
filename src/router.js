import express from "express";
const router = express.Router();

import * as movieController from "./controllers/movieController.js";

router.get("/", (_, res) => {
  return res.json("Welcome to my world~");
});

router.get("/movies", movieController.getAll);
router.get("/movies/:id", movieController.getById);
router.post("/movies", movieController.create);
router.patch("/movies/:id", movieController.update);
router.delete("/movies/:id", movieController.remove);

export default router;
