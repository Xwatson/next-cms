/*
  Warnings:

  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_RolePermissions` DROP FOREIGN KEY `_RolePermissions_A_fkey`;

-- DropTable
DROP TABLE `permissions`;

-- CreateTable
CREATE TABLE `next_permissions` (
    `permission_id` INTEGER NOT NULL AUTO_INCREMENT,
    `permission_name` VARCHAR(191) NOT NULL,
    `permission_code` VARCHAR(191) NOT NULL,
    `permission_description` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `next_permissions_permission_code_key`(`permission_code`),
    PRIMARY KEY (`permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_RolePermissions` ADD CONSTRAINT `_RolePermissions_A_fkey` FOREIGN KEY (`A`) REFERENCES `next_permissions`(`permission_id`) ON DELETE CASCADE ON UPDATE CASCADE;
