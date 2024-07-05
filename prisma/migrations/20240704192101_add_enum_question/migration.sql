/*
  Warnings:

  - The values [Mixed] on the enum `Question_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Question` MODIFY `type` ENUM('Multiple', 'Essay', 'TrueOrFalse', 'Choice') NOT NULL;
