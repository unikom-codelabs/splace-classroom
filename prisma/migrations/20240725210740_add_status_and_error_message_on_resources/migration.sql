-- AlterTable
ALTER TABLE `Resource` ADD COLUMN `error_message` VARCHAR(191) NULL,
    ADD COLUMN `status_rag` ENUM('on_progress', 'success', 'failed') NOT NULL DEFAULT 'on_progress';
