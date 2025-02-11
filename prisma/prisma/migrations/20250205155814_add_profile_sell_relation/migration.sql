/*
  Warnings:

  - You are about to drop the column `photoIdCard` on the `profile` table. All the data in the column will be lost.
  - Added the required column `contactInfo` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoIDcard` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profile` DROP COLUMN `photoIdCard`,
    ADD COLUMN `contactInfo` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `photoIDcard` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `profileId` INTEGER NULL;
