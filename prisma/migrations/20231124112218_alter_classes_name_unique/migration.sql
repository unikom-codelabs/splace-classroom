/*
  Warnings:

  - You are about to drop the column `score` on the `User_quiz` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Classes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User_quiz` DROP COLUMN `score`;

-- CreateIndex
CREATE UNIQUE INDEX `Classes_name_key` ON `Classes`(`name`);
