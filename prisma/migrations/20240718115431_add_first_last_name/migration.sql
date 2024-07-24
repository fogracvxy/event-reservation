/*
  Warnings:

  - Added the required column `first_name` to the `user_auth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `user_auth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_auth" ADD COLUMN "first_name" VARCHAR(50) NOT NULL DEFAULT '',
                        ADD COLUMN "last_name" VARCHAR(50) NOT NULL DEFAULT '';

-- After adding the columns with default values, we can remove the defaults
ALTER TABLE "user_auth" ALTER COLUMN "first_name" DROP DEFAULT,
                        ALTER COLUMN "last_name" DROP DEFAULT;