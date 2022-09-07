/*
  Warnings:

  - You are about to drop the column `status` on the `Target` table. All the data in the column will be lost.
  - You are about to drop the column `targetId` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_targetId_fkey";

-- AlterTable
ALTER TABLE "Target" DROP COLUMN "status",
ADD COLUMN     "tagId" TEXT;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "targetId";

-- DropEnum
DROP TYPE "TargetStatus";

-- AddForeignKey
ALTER TABLE "Target" ADD CONSTRAINT "Target_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
