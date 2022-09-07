-- AlterTable
ALTER TABLE "Target" ADD COLUMN     "description" TEXT DEFAULT '',
ADD COLUMN     "end" TIMESTAMP(3),
ADD COLUMN     "start" TIMESTAMP(3);
