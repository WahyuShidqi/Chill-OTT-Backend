import * as movieService from "../services/movieServices.js";

const getAll = async (req, res) => {
  try {
    const data = await movieService.getAllMovies();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

export { getAll, getById, create, update, remove };
