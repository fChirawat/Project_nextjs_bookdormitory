/*
  Warnings:

  - Added the required column `updatedAt` to the `ProfileSell` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profilesell` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

ALTER TABLE Profile
ADD COLUMN phoneNumber VARCHAR(191) NOT NULL,
ADD COLUMN email VARCHAR(191) NOT NULL,
ADD COLUMN contactInfo VARCHAR(191) NOT NULL,
ADD COLUMN title VARCHAR(50) NOT NULL;
