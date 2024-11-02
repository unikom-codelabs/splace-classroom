/*
  Warnings:

  - Added the required column `user_id` to the `boardPartition` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `usertask` DROP FOREIGN KEY `UserTask_user_id_fkey`;

-- AlterTable
ALTER TABLE `boardpartition` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usertask` MODIFY `user_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `boardPartition` ADD CONSTRAINT `boardPartition_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTask` ADD CONSTRAINT `UserTask_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
