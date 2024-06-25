-- CreateTable
CREATE TABLE `Setting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_name` VARCHAR(191) NOT NULL,
    `university_name` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `banner` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `color` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
