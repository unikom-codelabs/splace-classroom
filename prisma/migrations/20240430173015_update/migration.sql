/*
  Warnings:

  - The values [INSTRUCTOR] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `type` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Quiz` ADD COLUMN `type` ENUM('Multiple', 'Essay', 'Mixed') NOT NULL;

-- AlterTable
ALTER TABLE `Resource` ADD COLUMN `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('ADMIN', 'TEACHER', 'STUDENT') NOT NULL DEFAULT 'STUDENT';
