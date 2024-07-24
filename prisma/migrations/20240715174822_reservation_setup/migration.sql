/*
  Warnings:

  - Added the required column `created_by` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "created_by" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "location" TEXT;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_auth"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
