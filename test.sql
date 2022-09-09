-- BEGIN;
-- ALTER TYPE "TagStatus" RENAME TO "TagStatus_old";

-- CREATE TYPE "TagStatus" AS ENUM ('Archive', 'Doing');

-- ALTER TABLE "Tag" ALTER COLUMN "status" DROP DEFAULT;

-- ALTER TABLE "Tag" ALTER COLUMN "status" TYPE "TagStatus" USING ("status"::text::"TagStatus");

-- -- ALTER TYPE "TagStatus_new" RENAME TO "TagStatus";
-- DROP TYPE "TagStatus_old";
-- -- ALTER TABLE "Tag" ALTER COLUMN "status" SET DEFAULT 'Doing';
-- COMMIT;

-- 1. rename the enum type you want to change
alter type "TagStatus" rename to "_TagStatus";
-- 2. create new type
create type "TagStatus" as enum ('Archive', 'Doing');
-- 3. rename column(s) which uses our enum type
alter table "Tag" rename column "status" to "_Status";
-- 4. add new column of new type
alter table "Tag" add "status" "TagStatus" not null default 'Doing';
-- 5. copy values to the new column
-- update "Tag" set "status" = "_Status"::text::"ProjectStatus";
-- -- 6. remove old column and type
-- alter table "Tag" drop column "_Status";
-- drop type "_TagStatus";