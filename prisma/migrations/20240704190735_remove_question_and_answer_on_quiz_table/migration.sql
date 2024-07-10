/*
  Warnings:

  - You are about to drop the column `answer` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Quiz` DROP COLUMN `answer`,
    DROP COLUMN `question`,
    ADD COLUMN `type` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'PUBLISHED';
