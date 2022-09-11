-- CreateEnum
CREATE TYPE "TargetStatus" AS ENUM ('Doing', 'Abandon', 'Success');

-- AlterTable
ALTER TABLE "Target" ADD COLUMN     "status" "TargetStatus" NOT NULL DEFAULT 'Doing';
