-- CreateEnum
CREATE TYPE "TargetStatus" AS ENUM ('InProcess', 'Completed');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "targetId" TEXT;

-- CreateTable
CREATE TABLE "Target" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Target_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target"("id") ON DELETE SET NULL ON UPDATE CASCADE;
