-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phone_key`(`phone`),
    UNIQUE INDEX `User_username_email_phone_key`(`username`, `email`, `phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    
    `userId` INTEGER NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `photoIDcard` VARCHAR(191) NOT NULL,
    `relationship` VARCHAR(191) NOT NULL,
    `phoneRelationship` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSell` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserSell_username_key`(`username`),
    UNIQUE INDEX `UserSell_email_key`(`email`),
    UNIQUE INDEX `UserSell_phone_key`(`phone`),
    UNIQUE INDEX `UserSell_username_email_phone_key`(`username`, `email`, `phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfileSell` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userSellId` INTEGER NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `photoIDcard` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ProfileSell_userSellId_key`(`userSellId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FormSell` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userSellId` INTEGER NOT NULL,
    `nameDormitory` VARCHAR(191) NOT NULL,
    `typeDormitory` VARCHAR(191) NOT NULL,
    `addressDormitory` VARCHAR(191) NOT NULL,
    `dormitoryDetails` VARCHAR(191) NOT NULL,
    `facilities` VARCHAR(191) NOT NULL,
    `roomNumber` INTEGER NOT NULL,
    `distanceDormitory` VARCHAR(191) NOT NULL,
    `roomDeposit` DOUBLE NOT NULL,
    `priceMonth` DOUBLE NOT NULL,
    `priceElectricity` DOUBLE NOT NULL,
    `priceWater` DOUBLE NOT NULL,
    `priceWifi` DOUBLE NOT NULL,
    `priceOther` DOUBLE NOT NULL,
    `photoDormitory` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileSell` ADD CONSTRAINT `ProfileSell_userSellId_fkey` FOREIGN KEY (`userSellId`) REFERENCES `UserSell`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FormSell` ADD CONSTRAINT `FormSell_userSellId_fkey` FOREIGN KEY (`userSellId`) REFERENCES `UserSell`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
