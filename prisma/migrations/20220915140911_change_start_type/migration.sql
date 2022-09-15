/*
  Warnings:

  - You are about to drop the column `expectEnd` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "expectEnd",
ALTER COLUMN "start" SET DATA TYPE TEXT;
