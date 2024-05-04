/*
  Warnings:

  - A unique constraint covering the columns `[reply_id]` on the table `Comments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Comments` MODIFY `reply_id` INTEGER NULL,
    MODIFY `is_pin` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `Comments_reply_id_key` ON `Comments`(`reply_id`);

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_reply_id_fkey` FOREIGN KEY (`reply_id`) REFERENCES `Comments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
