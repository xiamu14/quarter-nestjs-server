/*
  Warnings:

  - You are about to drop the column `state` on the `Tag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "state";

-- DropEnum
DROP TYPE "ProjectStatus";
