/*
  Warnings:

  - You are about to drop the column `azure_datasource_name` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `azure_index_name` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `azure_indexer_name` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Course` DROP COLUMN `azure_datasource_name`,
    DROP COLUMN `azure_index_name`,
    DROP COLUMN `azure_indexer_name`;
