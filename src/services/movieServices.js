// SERVICE UNTUK HANDLE BUSINESS LOGIC

import * as movieRepo from "../repositories/movieRepo.js";

// const getAllMovies = async () => {
//   return await movieRepo.findAll();
// };

const getAllMovies = async (queryParams = {}) => {
  const {
    search,
    sortBy = "id",
    order = "asc",
    page = 1,
    limit = 10,
  } = queryParams;

  // validasi / sanitasi nilai
  const safePage = Math.max(1, parseInt(page) || 1);
  const safeLimit = Math.min(100, Math.max(1, parseInt(limit) || 10));
  const [data, total] = await Promise.all([
    movieRepo.findAll({
      search,
      sortBy,
      order,
      page: safePage,
      limit: safeLimit,
    }),
    movieRepo.countAll(search),
  ]);

  return {
    data,
    meta: {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit),
    },
  };
};

const getMovieById = async (id) => {
  if (!id) throw new Error("Id movie tidak ditemukan!");
  const movie = await movieRepo.findById(id);
  if (!movie) throw new Error("Movie tidak ditemukan");

  return movie;
};

const addMovie = async (data) => {
  const requiredData = [
    "title",
    "banner",
    "poster",
    "rating",
    "age_rating",
    "description",
    "casts",
    "created_by",
    "duration",
    "is_premium",
  ];

  for (const req of requiredData) {
    if (data[req] === undefined || data[req] === null) {
      throw new Error(`${data[req]} is required`);
    }
  }

  return await movieRepo.create(data);
};

// const updateMovie = async (id, data) => {
//   await getMovieById(id); // cek supaya tidak error silence

//   return await movieRepo.update(id, data);
// };

const updateMovie = async (id, data) => {
  const existing = await getMovieById(id);

  const title = data.title !== undefined ? data.title : existing.title;
  const bannerUrl = data.banner !== undefined ? data.banner : existing.banner;
  const poster = data.poster !== undefined ? data.poster : existing.poster;
  const rating = data.rating !== undefined ? data.rating : existing.rating;
  const ageRating =
    data.age_rating !== undefined ? data.age_rating : existing.age_rating;
  const description =
    data.description !== undefined ? data.description : existing.description;
  const casts = data.casts !== undefined ? data.casts : existing.casts;
  const created_by =
    data.created_by !== undefined ? data.created_by : existing.created_by;
  const duration =
    data.duration !== undefined ? data.duration : existing.duration;
  const isPremium =
    data.is_premium !== undefined ? data.is_premium : existing.is_premium;
  // const photo_url =
  //   data.photo_url !== undefined ? data.photo_url : existing.photo_url;
  return await movieRepo.update(
    id,
    title,
    bannerUrl,
    poster,
    rating,
    ageRating,
    description,
    casts,
    created_by,
    duration,
    isPremium,
  );
};

const deleteMovie = async (id) => {
  await getMovieById(id); //bisa melempar error kalau memang id tersebut sudah dihapus
  return await movieRepo.deleteById(id);
};

export { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie };

// CONTOH DARI TUTOR
// // src/services/studentService.js
// import * as studentRepo from '../repositories/studentRepository.js';

// // GET ALL
// const getAllStudents = async () => {
//   return await studentRepo.findAll();
// };

// // GET BY ID
// const getStudentById = async (id) => {
//   if (!id) throw new Error('ID Mahasiswa harus diisi!');
//   const student = await studentRepo.findById(id);
//   if (!student) throw new Error('Mahasiswa tidak ditemukan');
//   return student;
// };

// // INSERT
// const addStudent = async (data) => {
//   const { name, email } = data;
//   if (!name || name.trim() === '') {
//     throw new Error('Nama mahasiswa tidak boleh kosong!');
//   }
//   if (!email || !email.includes('@')) {
//     throw new Error('Format email tidak valid!');
//   }
//   return await studentRepo.create(name, email);
// };

// // UPDATE (Menangani edit data parsial)
// const updateStudent = async (id, data) => {
//   await getStudentById(id); // Cek dulu supaya tidak error silence
//   const { name, email } = data;
//   return await studentRepo.update(id, name, email);
// };

// // DELETE
// const deleteStudent = async (id) => {
//   await getStudentById(id); // Bisa melempar error kalau ternyata id tsb sudah dihapus
//   return await studentRepo.deleteById(id);
// };

// export { getAllStudents, getStudentById, addStudent, updateStudent, deleteStudent };
