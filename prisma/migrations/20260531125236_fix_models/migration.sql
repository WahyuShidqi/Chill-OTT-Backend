-- AlterTable
ALTER TABLE "movies" ALTER COLUMN "is_premium" SET DEFAULT false,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "pembayaran" ALTER COLUMN "is_paid" SET DEFAULT false;

-- AlterTable
ALTER TABLE "series" ALTER COLUMN "is_premium" SET DEFAULT false,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "is_deleted" SET DEFAULT false;
