-- AlterTable
ALTER TABLE `Course` ALTER COLUMN `azure_container_name` DROP DEFAULT,
    ALTER COLUMN `azure_datasource_name` DROP DEFAULT,
    ALTER COLUMN `azure_index_name` DROP DEFAULT,
    ALTER COLUMN `azure_indexer_name` DROP DEFAULT;
