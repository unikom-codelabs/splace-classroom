-- AlterTable
-- ALTER TABLE `Comments` ADD COLUMN `attachments` JSON NOT NULL;
-- InsertData
INSERT INTO `Classes` (`id`,`name`,`updatedAt`) VALUES (99,'Class For Admin',NOW());
INSERT INTO `Course` (`id`,`name`,`createdAt`,`updatedAt`,`azure_container_name`,`azure_datasource_name`,`azure_index_name`,`azure_indexer_name`) VALUES (99,'Course 1','2024-06-15 07:23:03',NOW(),'dev-splaceclassroom','dev-splaceclassroom','dev-splaceclassroom','indexer1718436633754');


INSERT INTO `User` (`id`,`username`,`password`,`name`,`role`,`class_id`,`updatedAt`) VALUES (99,'StudentAdmin','$2a$10$020uMkh2DurLE9Uf9ZVclO2d8iqVNAg/yOPS4ctjFaCz9NQJz4ZcW','student','STUDENT',99,NOW());


INSERT INTO `User` (`username`,`password`,`name`,`role`,`updatedAt`) VALUES ('TeacherAdmin','$2a$10$020uMkh2DurLE9Uf9ZVclO2d8iqVNAg/yOPS4ctjFaCz9NQJz4ZcW','Instructor','TEACHER',NOW());

INSERT INTO `User_course`( `user_id`, `course_id`,`updatedAt`) VALUES (99,99,NOW());