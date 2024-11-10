-- DropForeignKey
ALTER TABLE `usertask` DROP FOREIGN KEY `UserTask_task_id_fkey`;

-- AddForeignKey
ALTER TABLE `UserTask` ADD CONSTRAINT `UserTask_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
