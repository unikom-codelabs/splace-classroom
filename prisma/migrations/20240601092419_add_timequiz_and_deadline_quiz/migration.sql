/*
  Warnings:

  - Added the required column `deadline` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Quiz` ADD COLUMN `deadline` DATETIME(3) NOT NULL,
    ADD COLUMN `duration` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `User_quiz` ADD COLUMN `duration` INTEGER NOT NULL DEFAULT 0;
