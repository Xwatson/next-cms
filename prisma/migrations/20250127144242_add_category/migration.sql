-- CreateTable
CREATE TABLE `next_category` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(191) NOT NULL,
    `category_code` VARCHAR(191) NOT NULL,
    `parent_id` INTEGER NULL,
    `category_sort` INTEGER NOT NULL DEFAULT 0,
    `category_description` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `next_category_category_code_key`(`category_code`),
    INDEX `next_category_parent_id_idx`(`parent_id`),
    INDEX `next_category_category_sort_idx`(`category_sort`),
    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `next_category` ADD CONSTRAINT `next_category_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `next_category`(`category_id`) ON DELETE SET NULL ON UPDATE CASCADE;
