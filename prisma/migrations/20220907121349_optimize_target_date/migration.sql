/*
  Warnings:

  - You are about to drop the column `end` on the `Target` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Target` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Target" DROP COLUMN "end",
DROP COLUMN "start",
ADD COLUMN     "date" TIMESTAMP(3);
