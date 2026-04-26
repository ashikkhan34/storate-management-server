/*
  Warnings:

  - You are about to drop the column `storage` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `used` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "storage",
DROP COLUMN "used",
ADD COLUMN     "totalStorage" INTEGER NOT NULL DEFAULT 15360,
ADD COLUMN     "usedStorage" INTEGER NOT NULL DEFAULT 0;
