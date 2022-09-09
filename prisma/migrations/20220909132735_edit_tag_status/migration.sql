/*
  Warnings:

  - The values [Active,Inactive] on the enum `TagStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TagStatus_new" AS ENUM ('Archive', 'Doing');
ALTER TABLE "Tag" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Tag" ALTER COLUMN "status" TYPE "TagStatus_new" USING ("status"::text::"TagStatus_new");
ALTER TYPE "TagStatus" RENAME TO "TagStatus_old";
ALTER TYPE "TagStatus_new" RENAME TO "TagStatus";
DROP TYPE "TagStatus_old";
ALTER TABLE "Tag" ALTER COLUMN "status" SET DEFAULT 'Doing';
COMMIT;

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "status" SET DEFAULT 'Doing';
