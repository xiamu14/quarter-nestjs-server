/*
  Warnings:

  - You are about to drop the column `tagId` on the `Target` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('Archive', 'Doing');

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_userId_fkey";

-- DropForeignKey
ALTER TABLE "Target" DROP CONSTRAINT "Target_tagId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_tagId_fkey";

-- AlterTable
ALTER TABLE "Target" DROP COLUMN "tagId",
ADD COLUMN     "projectId" TEXT;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "tagId",
ADD COLUMN     "projectId" TEXT;

-- DropTable
DROP TABLE "Tag";

-- DropEnum
DROP TYPE "TagStatus";

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '',
    "status" "ProjectStatus" NOT NULL DEFAULT 'Doing',
    "userId" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Target" ADD CONSTRAINT "Target_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
