/*
  Warnings:

  - You are about to drop the column `class_id` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_class_id_fkey` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `class_id`;
