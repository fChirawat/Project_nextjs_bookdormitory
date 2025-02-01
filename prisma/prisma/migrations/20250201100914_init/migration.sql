/*
  Warnings:

  - You are about to alter the column `distanceDormitory` on the `formsell` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to drop the column `photoIDcard` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `photoIDcard` on the `profilesell` table. All the data in the column will be lost.
  - You are about to drop the column `userSellId` on the `profilesell` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `ProfileSell` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `photoIdCard` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoIdCard` to the `ProfileSell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ProfileSell` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `profilesell` DROP FOREIGN KEY `ProfileSell_userSellId_fkey`;

-- DropIndex
DROP INDEX `ProfileSell_userSellId_key` ON `profilesell`;

-- AlterTable
ALTER TABLE `formsell` MODIFY `dormitoryDetails` VARCHAR(191) NULL,
    MODIFY `distanceDormitory` DOUBLE NOT NULL,
    MODIFY `photoDormitory` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `profile` DROP COLUMN `photoIDcard`,
    ADD COLUMN `photoIdCard` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `profilesell` DROP COLUMN `photoIDcard`,
    DROP COLUMN `userSellId`,
    ADD COLUMN `photoIdCard` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ProfileSell_userId_key` ON `ProfileSell`(`userId`);

-- AddForeignKey
ALTER TABLE `ProfileSell` ADD CONSTRAINT `ProfileSell_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserSell`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
