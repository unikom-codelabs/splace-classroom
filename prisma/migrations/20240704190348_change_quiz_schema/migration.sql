/*
  Warnings:

  - You are about to drop the column `type` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Quiz` DROP COLUMN `type`;

-- CreateTable
CREATE TABLE `Question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `answer` JSON NOT NULL,
    `image` VARCHAR(191) NULL,
    `type` ENUM('Multiple', 'Essay', 'Mixed') NOT NULL,
    `quiz_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_quiz_id_fkey` FOREIGN KEY (`quiz_id`) REFERENCES `Quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
