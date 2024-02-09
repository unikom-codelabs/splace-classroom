-- AlterTable
ALTER TABLE `Course` ADD COLUMN `azure_container_name` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `azure_datasource_name` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `azure_index_name` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `azure_indexer_name` VARCHAR(191) NOT NULL DEFAULT '';
