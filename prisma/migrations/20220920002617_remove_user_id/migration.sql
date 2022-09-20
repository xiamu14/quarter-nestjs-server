/*
  Warnings:

  - You are about to drop the column `userId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Target` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Target" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "userId";
