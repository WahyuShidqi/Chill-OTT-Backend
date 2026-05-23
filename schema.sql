CREATE TABLE series (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  banner VARCHAR(255),
  poster VARCHAR(255),
  rating VARCHAR(10),
  age_rating VARCHAR(10),
  description TEXT,
  casts VARCHAR(255),
  created_by VARCHAR(255),
  is_premium BOOLEAN,
  created_at TIMESTAMP
);

CREATE TABLE episodes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  thumbnail VARCHAR(255),
  description TEXT,
  duration INT,
  series_id INT,
  FOREIGN KEY (series_id) REFERENCES series(id)
);


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  role VARCHAR(50),
  avatar VARCHAR(255),
  created_at TIMESTAMP,
  is_deleted BOOLEAN
);


CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  banner VARCHAR(255),
  poster VARCHAR(255),
  rating VARCHAR(10),
  age_rating VARCHAR(10),
  description TEXT,
  casts VARCHAR(255),
  created_by VARCHAR(255),
  duration INT,
  is_premium BOOLEAN,
  created_at TIMESTAMP
);


CREATE TABLE daftar_saya (
  id SERIAL PRIMARY KEY,
  user_id INT,
  created_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE user_movie_list (
  id SERIAL PRIMARY KEY,
  movie_id INT,
  daftar_saya_id INT,
  created_at TIMESTAMP,
  FOREIGN KEY (movie_id) REFERENCES movies(id),
  FOREIGN KEY (daftar_saya_id) REFERENCES daftar_saya(id)
);

CREATE TABLE user_series_list (
  id SERIAL PRIMARY KEY,
  series_id INT,
  daftar_saya_id INT,
  created_at TIMESTAMP,
  FOREIGN KEY (series_id) REFERENCES series(id),
  FOREIGN KEY (daftar_saya_id) REFERENCES daftar_saya(id)
);


CREATE TABLE genre (
  genre_id SERIAL PRIMARY KEY,
  genre_name VARCHAR(100)
);

CREATE TABLE movie_genre (
  id SERIAL PRIMARY KEY,
  genre_id INT,
  movie_id INT,
  FOREIGN KEY (genre_id) REFERENCES genre(genre_id),
  FOREIGN KEY (movie_id) REFERENCES movies(id)
);

CREATE TABLE series_genre (
  id SERIAL PRIMARY KEY,
  genre_id INT,
  series_id INT,
  FOREIGN KEY (genre_id) REFERENCES genre(genre_id),
  FOREIGN KEY (series_id) REFERENCES series(id)
);


CREATE TABLE paket (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  price INT
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT,
  paket_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (paket_id) REFERENCES paket(id)
);

CREATE TABLE pembayaran (
  id SERIAL PRIMARY KEY,
  is_paid BOOLEAN,
  expired_date TIMESTAMP,
  order_id INT,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- ! insert sample data

INSERT INTO users (name, email, password, role, avatar, created_at, is_deleted)
VALUES
('Admin One', 'admin@mail.com', 'hashed_admin', 'admin', 'admin.png', NOW(), false),
('User One', 'user1@mail.com', 'hashed_user1', 'user', 'user1.png', NOW(), false),
('User Two', 'user2@mail.com', 'hashed_user2', 'user', 'user2.png', NOW(), false);

INSERT INTO series (title, banner, poster, rating, age_rating, description, casts, created_by, is_premium, created_at)
VALUES
('Shadow Realm', 'banner1.jpg', 'poster1.jpg', '8.5', '13+', 'Dark fantasy world of shadows.', 'Actor A, Actor B', 'Admin One', false, NOW()),
('Sky Knights', 'banner2.jpg', 'poster2.jpg', '9.0', '13+', 'Airship wars above the clouds.', 'Actor C, Actor D', 'Admin One', true, NOW());

INSERT INTO episodes (title, thumbnail, description, duration, series_id)
VALUES
('Awakening', 'ep1.jpg', 'The journey begins.', 45, 1),
('Shadows Rise', 'ep2.jpg', 'Dark forces appear.', 50, 1),
('Sky Takeoff', 'ep3.jpg', 'The fleet rises.', 48, 2);

INSERT INTO movies (title, banner, poster, rating, age_rating, description, casts, created_by, duration, is_premium, created_at)
VALUES
('Lost City', 'm1_banner.jpg', 'm1_poster.jpg', '7.8', '16+', 'Adventure in ancient ruins.', 'Actor X, Actor Y', 'Admin One', 120, false, NOW()),
('Neon War', 'm2_banner.jpg', 'm2_poster.jpg', '8.9', '16+', 'Cyberpunk resistance war.', 'Actor Z', 'Admin One', 135, true, NOW());

INSERT INTO genre (genre_name)
VALUES
('Action'),
('Fantasy'),
('Sci-Fi'),
('Adventure');

INSERT INTO movie_genre (genre_id, movie_id)
VALUES
(1, 1),
(4, 1),
(1, 2),
(3, 2);

INSERT INTO series_genre (genre_id, series_id)
VALUES
(2, 1),
(3, 2);

INSERT INTO paket (name, price)
VALUES
('Basic', 50000),
('Premium', 100000);

INSERT INTO orders (user_id, paket_id)
VALUES
(2, 1),
(2, 2);

INSERT INTO pembayaran (is_paid, expired_date, order_id)
VALUES
(true, NOW() + INTERVAL '30 days', 1),
(false, NOW() + INTERVAL '30 days', 2);

INSERT INTO daftar_saya (user_id, created_at)
VALUES
(2, NOW());

INSERT INTO user_movie_list (movie_id, daftar_saya_id, created_at)
VALUES
(1, 1, NOW()),
(2, 1, NOW());

INSERT INTO user_series_list (series_id, daftar_saya_id, created_at)
VALUES
(1, 1, NOW()),
(2, 1, NOW());