/*
  Warnings:

  - You are about to drop the `Classes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_class_id_fkey`;

-- DropTable
DROP TABLE `Classes`;
