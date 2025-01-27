/*
  Warnings:

  - Added the required column `permission_type` to the `next_permissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `next_permissions` ADD COLUMN `permission_type` VARCHAR(191) NOT NULL;
