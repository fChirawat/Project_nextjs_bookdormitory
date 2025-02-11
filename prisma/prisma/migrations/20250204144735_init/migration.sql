/*
  Warnings:

  - You are about to drop the column `contactInfo` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `profile` DROP COLUMN `contactInfo`,
    DROP COLUMN `email`,
    DROP COLUMN `phoneNumber`,
    DROP COLUMN `title`;
