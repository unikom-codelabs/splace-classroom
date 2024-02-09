/*
  Warnings:

  - Added the required column `score` to the `User_quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User_quiz` ADD COLUMN `score` INTEGER NOT NULL;
