-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT '';
