import * as movieService from "../services/movieServices.js";

// const getAll = async (req, res) => {
//   try {
//     const data = await movieService.getAllMovies();
//     res.status(200).json({ success: true, data });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// src/controllers/studentController.js — update getAll
const getAll = async (req, res) => {
  try {
    console.log(req.query);
    // req.query berisi semua query params dari URL
    const result = await movieService.getAllMovies(req.query);
    res.status(200).json({
      success: true,
      data: result.data,
      meta: result.meta,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await movieService.getMovieById(req.params.id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await movieService.addMovie(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await movieService.updateMovie(req.params.id, req.body);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const data = await movieService.deleteMovie(req.params.id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// src/controllers/studentController.js — tambahkan fungsi ini
const uploadBanner = async (req, res) => {
  try {
    // req.file diisi oleh Multer middleware (sudah diproses sebelum controller ini)
    if (!req.file) {
      return res.status(400).json({ error: "Tidak ada file yang diupload!" });
    }

    const { id } = req.params;

    // Bangun URL yang bisa diakses client
    const bannerUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    // Kirim ke service untuk update database
    const data = await movieService.updateMovie(id, {
      banner: bannerUrl,
    });
    res
      .status(200)
      .json({ success: true, message: "Banner berhasil diupload!", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getAll, getById, create, update, remove, uploadBanner };
