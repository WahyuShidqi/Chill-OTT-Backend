-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "role" TEXT,
    "avatar" TEXT,
    "created_at" TIMESTAMP(3),
    "is_deleted" BOOLEAN,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "series" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "banner" TEXT,
    "poster" TEXT,
    "rating" TEXT,
    "age_rating" TEXT,
    "description" TEXT,
    "casts" TEXT,
    "created_by" TEXT,
    "is_premium" BOOLEAN,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episodes" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "thumbnail" TEXT,
    "description" TEXT,
    "duration" INTEGER,
    "series_id" INTEGER,

    CONSTRAINT "episodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "banner" TEXT,
    "poster" TEXT,
    "rating" TEXT,
    "age_rating" TEXT,
    "description" TEXT,
    "casts" TEXT,
    "created_by" TEXT,
    "duration" INTEGER,
    "is_premium" BOOLEAN,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daftar_saya" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "daftar_saya_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_movie_list" (
    "id" SERIAL NOT NULL,
    "movie_id" INTEGER,
    "daftar_saya_id" INTEGER,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "user_movie_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_series_list" (
    "id" SERIAL NOT NULL,
    "series_id" INTEGER,
    "daftar_saya_id" INTEGER,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "user_series_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genre" (
    "genre_id" SERIAL NOT NULL,
    "genre_name" TEXT,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("genre_id")
);

-- CreateTable
CREATE TABLE "movie_genre" (
    "id" SERIAL NOT NULL,
    "genre_id" INTEGER,
    "movie_id" INTEGER,

    CONSTRAINT "movie_genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "series_genre" (
    "id" SERIAL NOT NULL,
    "genre_id" INTEGER,
    "series_id" INTEGER,

    CONSTRAINT "series_genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paket" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "price" INTEGER,

    CONSTRAINT "paket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "paket_id" INTEGER,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pembayaran" (
    "id" SERIAL NOT NULL,
    "is_paid" BOOLEAN,
    "expired_date" TIMESTAMP(3),
    "order_id" INTEGER,

    CONSTRAINT "pembayaran_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "series"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daftar_saya" ADD CONSTRAINT "daftar_saya_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_movie_list" ADD CONSTRAINT "user_movie_list_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_movie_list" ADD CONSTRAINT "user_movie_list_daftar_saya_id_fkey" FOREIGN KEY ("daftar_saya_id") REFERENCES "daftar_saya"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_series_list" ADD CONSTRAINT "user_series_list_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "series"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_series_list" ADD CONSTRAINT "user_series_list_daftar_saya_id_fkey" FOREIGN KEY ("daftar_saya_id") REFERENCES "daftar_saya"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_genre" ADD CONSTRAINT "movie_genre_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genre"("genre_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_genre" ADD CONSTRAINT "movie_genre_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "series_genre" ADD CONSTRAINT "series_genre_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genre"("genre_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "series_genre" ADD CONSTRAINT "series_genre_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "series"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_paket_id_fkey" FOREIGN KEY ("paket_id") REFERENCES "paket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pembayaran" ADD CONSTRAINT "pembayaran_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
