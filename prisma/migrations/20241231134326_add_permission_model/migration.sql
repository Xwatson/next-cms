/*
  Warnings:

  - You are about to drop the column `permissions` on the `next_role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `next_role` DROP COLUMN `permissions`,
    ADD COLUMN `role_description` TEXT NULL;

-- CreateTable
CREATE TABLE `permissions` (
    `permission_id` INTEGER NOT NULL AUTO_INCREMENT,
    `permission_name` VARCHAR(191) NOT NULL,
    `permission_code` VARCHAR(191) NOT NULL,
    `permission_description` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `permissions_permission_code_key`(`permission_code`),
    PRIMARY KEY (`permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RolePermissions` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RolePermissions_AB_unique`(`A`, `B`),
    INDEX `_RolePermissions_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_RolePermissions` ADD CONSTRAINT `_RolePermissions_A_fkey` FOREIGN KEY (`A`) REFERENCES `permissions`(`permission_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RolePermissions` ADD CONSTRAINT `_RolePermissions_B_fkey` FOREIGN KEY (`B`) REFERENCES `next_role`(`role_id`) ON DELETE CASCADE ON UPDATE CASCADE;
