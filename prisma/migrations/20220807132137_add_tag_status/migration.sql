-- CreateEnum
CREATE TYPE "TagStatus" AS ENUM ('Active', 'Inactive');

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "status" "TagStatus" NOT NULL DEFAULT 'Active';
