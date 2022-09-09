-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('Archive', 'Doing');

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "state" "ProjectStatus" NOT NULL DEFAULT 'Doing';
