/*
  Warnings:

  - The primary key for the `next_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category_code` on the `next_category` table. All the data in the column will be lost.
  - You are about to drop the column `category_description` on the `next_category` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `next_category` table. All the data in the column will be lost.
  - You are about to drop the column `category_name` on the `next_category` table. All the data in the column will be lost.
  - You are about to drop the column `category_sort` on the `next_category` table. All the data in the column will be lost.
  - The primary key for the `next_permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `permission_code` on the `next_permissions` table. All the data in the column will be lost.
  - You are about to drop the column `permission_description` on the `next_permissions` table. All the data in the column will be lost.
  - You are about to drop the column `permission_id` on the `next_permissions` table. All the data in the column will be lost.
  - You are about to drop the column `permission_name` on the `next_permissions` table. All the data in the column will be lost.
  - You are about to drop the column `permission_type` on the `next_permissions` table. All the data in the column will be lost.
  - The primary key for the `next_role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role_code` on the `next_role` table. All the data in the column will be lost.
  - You are about to drop the column `role_description` on the `next_role` table. All the data in the column will be lost.
  - You are about to drop the column `role_id` on the `next_role` table. All the data in the column will be lost.
  - You are about to drop the column `role_name` on the `next_role` table. All the data in the column will be lost.
  - You are about to drop the column `role_remark` on the `next_role` table. All the data in the column will be lost.
  - The primary key for the `next_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_avatar` on the `next_user` table. All the data in the column will be lost.
  - You are about to drop the column `user_email` on the `next_user` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `next_user` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `next_user` table. All the data in the column will be lost.
  - You are about to drop the column `user_password` on the `next_user` table. All the data in the column will be lost.
  - You are about to drop the column `user_phone` on the `next_user` table. All the data in the column will be lost.
  - You are about to drop the column `user_status` on the `next_user` table. All the data in the column will be lost.
  - The primary key for the `next_video` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `type_id` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_actor` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_area` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_author` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_behind` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_blurb` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_class` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_color` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_content` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_copyright` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_director` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_douban_id` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_douban_score` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_down` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_down_from` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_down_note` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_down_server` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_down_url` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_duration` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_en` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_hits` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_hits_day` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_hits_month` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_hits_week` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_id` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_isend` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_jumpurl` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_lang` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_letter` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_level` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_lock` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_name` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_pic` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_pic_screenshot` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_pic_slide` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_pic_thumb` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_play_from` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_play_note` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_play_server` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_play_url` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_plot` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_plot_detail` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_plot_name` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_points` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_points_down` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_points_play` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_pubdate` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_pwd` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_pwd_down` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_pwd_down_url` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_pwd_play` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_pwd_play_url` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_pwd_url` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_rel_art` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_rel_vod` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_remarks` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_reurl` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_score` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_score_all` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_score_num` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_serial` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_state` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_status` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_sub` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_tag` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_time` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_time_add` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_time_hits` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_time_make` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_total` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_tpl` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_tpl_down` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_tpl_play` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_trysee` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_tv` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_up` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_version` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_weekday` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_writer` on the `next_video` table. All the data in the column will be lost.
  - You are about to drop the column `video_year` on the `next_video` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `next_category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `next_permissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `next_role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `next_role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `next_user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `next_user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `next_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `next_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `next_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `next_permissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `next_permissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `next_permissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `next_permissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `next_role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `next_role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `next_role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `next_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `next_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `next_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `next_video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `next_video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `down_url` to the `next_video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `next_video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `play_url` to the `next_video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plot_detail` to the `next_video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plot_name` to the `next_video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_RolePermissions` DROP FOREIGN KEY `_RolePermissions_A_fkey`;

-- DropForeignKey
ALTER TABLE `_RolePermissions` DROP FOREIGN KEY `_RolePermissions_B_fkey`;

-- DropForeignKey
ALTER TABLE `next_category` DROP FOREIGN KEY `next_category_parent_id_fkey`;

-- DropForeignKey
ALTER TABLE `next_user` DROP FOREIGN KEY `next_user_role_id_fkey`;

-- DropIndex
DROP INDEX `next_category_category_code_key` ON `next_category`;

-- DropIndex
DROP INDEX `next_category_category_sort_idx` ON `next_category`;

-- DropIndex
DROP INDEX `next_permissions_permission_code_key` ON `next_permissions`;

-- DropIndex
DROP INDEX `next_role_role_code_idx` ON `next_role`;

-- DropIndex
DROP INDEX `next_role_role_code_key` ON `next_role`;

-- DropIndex
DROP INDEX `next_role_role_name_key` ON `next_role`;

-- DropIndex
DROP INDEX `next_user_user_email_idx` ON `next_user`;

-- DropIndex
DROP INDEX `next_user_user_email_key` ON `next_user`;

-- DropIndex
DROP INDEX `next_user_user_phone_idx` ON `next_user`;

-- DropIndex
DROP INDEX `next_user_user_phone_key` ON `next_user`;

-- DropIndex
DROP INDEX `next_video_type_id_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_actor_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_area_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_class_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_director_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_down_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_en_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_hits_day_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_hits_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_hits_month_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_hits_week_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_isend_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_lang_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_letter_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_level_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_lock_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_name_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_plot_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_points_down_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_points_play_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_score_all_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_score_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_score_num_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_state_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_tag_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_time_add_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_time_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_time_make_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_total_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_up_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_version_idx` ON `next_video`;

-- DropIndex
DROP INDEX `next_video_video_year_idx` ON `next_video`;

-- AlterTable
ALTER TABLE `next_category` DROP PRIMARY KEY,
    DROP COLUMN `category_code`,
    DROP COLUMN `category_description`,
    DROP COLUMN `category_id`,
    DROP COLUMN `category_name`,
    DROP COLUMN `category_sort`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `sort` INTEGER NOT NULL DEFAULT 0,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `next_permissions` DROP PRIMARY KEY,
    DROP COLUMN `permission_code`,
    DROP COLUMN `permission_description`,
    DROP COLUMN `permission_id`,
    DROP COLUMN `permission_name`,
    DROP COLUMN `permission_type`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `next_role` DROP PRIMARY KEY,
    DROP COLUMN `role_code`,
    DROP COLUMN `role_description`,
    DROP COLUMN `role_id`,
    DROP COLUMN `role_name`,
    DROP COLUMN `role_remark`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `remark` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `next_user` DROP PRIMARY KEY,
    DROP COLUMN `user_avatar`,
    DROP COLUMN `user_email`,
    DROP COLUMN `user_id`,
    DROP COLUMN `user_name`,
    DROP COLUMN `user_password`,
    DROP COLUMN `user_phone`,
    DROP COLUMN `user_status`,
    ADD COLUMN `avatar` VARCHAR(191) NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `name` VARCHAR(191) NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `status` ENUM('ACTIVE', 'INACTIVE', 'LOCKED') NOT NULL DEFAULT 'ACTIVE',
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `next_video` DROP PRIMARY KEY,
    DROP COLUMN `type_id`,
    DROP COLUMN `video_actor`,
    DROP COLUMN `video_area`,
    DROP COLUMN `video_author`,
    DROP COLUMN `video_behind`,
    DROP COLUMN `video_blurb`,
    DROP COLUMN `video_class`,
    DROP COLUMN `video_color`,
    DROP COLUMN `video_content`,
    DROP COLUMN `video_copyright`,
    DROP COLUMN `video_director`,
    DROP COLUMN `video_douban_id`,
    DROP COLUMN `video_douban_score`,
    DROP COLUMN `video_down`,
    DROP COLUMN `video_down_from`,
    DROP COLUMN `video_down_note`,
    DROP COLUMN `video_down_server`,
    DROP COLUMN `video_down_url`,
    DROP COLUMN `video_duration`,
    DROP COLUMN `video_en`,
    DROP COLUMN `video_hits`,
    DROP COLUMN `video_hits_day`,
    DROP COLUMN `video_hits_month`,
    DROP COLUMN `video_hits_week`,
    DROP COLUMN `video_id`,
    DROP COLUMN `video_isend`,
    DROP COLUMN `video_jumpurl`,
    DROP COLUMN `video_lang`,
    DROP COLUMN `video_letter`,
    DROP COLUMN `video_level`,
    DROP COLUMN `video_lock`,
    DROP COLUMN `video_name`,
    DROP COLUMN `video_pic`,
    DROP COLUMN `video_pic_screenshot`,
    DROP COLUMN `video_pic_slide`,
    DROP COLUMN `video_pic_thumb`,
    DROP COLUMN `video_play_from`,
    DROP COLUMN `video_play_note`,
    DROP COLUMN `video_play_server`,
    DROP COLUMN `video_play_url`,
    DROP COLUMN `video_plot`,
    DROP COLUMN `video_plot_detail`,
    DROP COLUMN `video_plot_name`,
    DROP COLUMN `video_points`,
    DROP COLUMN `video_points_down`,
    DROP COLUMN `video_points_play`,
    DROP COLUMN `video_pubdate`,
    DROP COLUMN `video_pwd`,
    DROP COLUMN `video_pwd_down`,
    DROP COLUMN `video_pwd_down_url`,
    DROP COLUMN `video_pwd_play`,
    DROP COLUMN `video_pwd_play_url`,
    DROP COLUMN `video_pwd_url`,
    DROP COLUMN `video_rel_art`,
    DROP COLUMN `video_rel_vod`,
    DROP COLUMN `video_remarks`,
    DROP COLUMN `video_reurl`,
    DROP COLUMN `video_score`,
    DROP COLUMN `video_score_all`,
    DROP COLUMN `video_score_num`,
    DROP COLUMN `video_serial`,
    DROP COLUMN `video_state`,
    DROP COLUMN `video_status`,
    DROP COLUMN `video_sub`,
    DROP COLUMN `video_tag`,
    DROP COLUMN `video_time`,
    DROP COLUMN `video_time_add`,
    DROP COLUMN `video_time_hits`,
    DROP COLUMN `video_time_make`,
    DROP COLUMN `video_total`,
    DROP COLUMN `video_tpl`,
    DROP COLUMN `video_tpl_down`,
    DROP COLUMN `video_tpl_play`,
    DROP COLUMN `video_trysee`,
    DROP COLUMN `video_tv`,
    DROP COLUMN `video_up`,
    DROP COLUMN `video_version`,
    DROP COLUMN `video_weekday`,
    DROP COLUMN `video_writer`,
    DROP COLUMN `video_year`,
    ADD COLUMN `actor` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `area` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `author` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `behind` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `blurb` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `category_id` INTEGER NOT NULL,
    ADD COLUMN `class` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `color` VARCHAR(6) NOT NULL DEFAULT '',
    ADD COLUMN `content` TEXT NOT NULL,
    ADD COLUMN `copyright` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `director` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `douban_id` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `douban_score` DECIMAL(3, 1) NOT NULL DEFAULT 0,
    ADD COLUMN `down` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `down_from` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `down_note` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `down_server` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `down_url` MEDIUMTEXT NOT NULL,
    ADD COLUMN `duration` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `en` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `hits` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `hits_day` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `hits_month` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `hits_week` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `isend` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `jumpurl` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `lang` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `letter` CHAR(1) NOT NULL DEFAULT '',
    ADD COLUMN `level` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `lock` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `name` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `pic` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `pic_screenshot` TEXT NULL,
    ADD COLUMN `pic_slide` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `pic_thumb` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `play_from` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `play_note` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `play_server` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `play_url` MEDIUMTEXT NOT NULL,
    ADD COLUMN `plot` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `plot_detail` MEDIUMTEXT NOT NULL,
    ADD COLUMN `plot_name` MEDIUMTEXT NOT NULL,
    ADD COLUMN `points` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `points_down` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `points_play` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `pubdate` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `pwd` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `pwd_down` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `pwd_down_url` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `pwd_play` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `pwd_play_url` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `pwd_url` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `rel_art` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `rel_vod` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `remarks` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `reurl` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `score` DECIMAL(3, 1) NOT NULL DEFAULT 0,
    ADD COLUMN `score_all` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `score_num` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `serial` VARCHAR(191) NOT NULL DEFAULT '0',
    ADD COLUMN `state` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `status` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `sub` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `tag` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `time` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `time_add` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `time_hits` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `time_make` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `total` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `tpl` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `tpl_down` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `tpl_play` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `trysee` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `tv` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `up` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `version` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `weekday` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `writer` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `year` VARCHAR(191) NOT NULL DEFAULT '',
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `next_category_code_key` ON `next_category`(`code`);

-- CreateIndex
CREATE INDEX `next_category_sort_idx` ON `next_category`(`sort`);

-- CreateIndex
CREATE UNIQUE INDEX `next_permissions_code_key` ON `next_permissions`(`code`);

-- CreateIndex
CREATE UNIQUE INDEX `next_role_name_key` ON `next_role`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `next_role_code_key` ON `next_role`(`code`);

-- CreateIndex
CREATE INDEX `next_role_code_idx` ON `next_role`(`code`);

-- CreateIndex
CREATE UNIQUE INDEX `next_user_email_key` ON `next_user`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `next_user_phone_key` ON `next_user`(`phone`);

-- CreateIndex
CREATE INDEX `next_user_email_idx` ON `next_user`(`email`);

-- CreateIndex
CREATE INDEX `next_user_phone_idx` ON `next_user`(`phone`);

-- CreateIndex
CREATE INDEX `next_video_category_id_idx` ON `next_video`(`category_id`);

-- CreateIndex
CREATE INDEX `next_video_level_idx` ON `next_video`(`level`);

-- CreateIndex
CREATE INDEX `next_video_hits_idx` ON `next_video`(`hits`);

-- CreateIndex
CREATE INDEX `next_video_letter_idx` ON `next_video`(`letter`);

-- CreateIndex
CREATE INDEX `next_video_name_idx` ON `next_video`(`name`);

-- CreateIndex
CREATE INDEX `next_video_year_idx` ON `next_video`(`year`);

-- CreateIndex
CREATE INDEX `next_video_area_idx` ON `next_video`(`area`);

-- CreateIndex
CREATE INDEX `next_video_lang_idx` ON `next_video`(`lang`);

-- CreateIndex
CREATE INDEX `next_video_tag_idx` ON `next_video`(`tag`);

-- CreateIndex
CREATE INDEX `next_video_class_idx` ON `next_video`(`class`);

-- CreateIndex
CREATE INDEX `next_video_lock_idx` ON `next_video`(`lock`);

-- CreateIndex
CREATE INDEX `next_video_up_idx` ON `next_video`(`up`);

-- CreateIndex
CREATE INDEX `next_video_down_idx` ON `next_video`(`down`);

-- CreateIndex
CREATE INDEX `next_video_en_idx` ON `next_video`(`en`);

-- CreateIndex
CREATE INDEX `next_video_hits_day_idx` ON `next_video`(`hits_day`);

-- CreateIndex
CREATE INDEX `next_video_hits_week_idx` ON `next_video`(`hits_week`);

-- CreateIndex
CREATE INDEX `next_video_hits_month_idx` ON `next_video`(`hits_month`);

-- CreateIndex
CREATE INDEX `next_video_plot_idx` ON `next_video`(`plot`);

-- CreateIndex
CREATE INDEX `next_video_points_play_idx` ON `next_video`(`points_play`);

-- CreateIndex
CREATE INDEX `next_video_points_down_idx` ON `next_video`(`points_down`);

-- CreateIndex
CREATE INDEX `next_video_time_add_idx` ON `next_video`(`time_add`);

-- CreateIndex
CREATE INDEX `next_video_time_idx` ON `next_video`(`time`);

-- CreateIndex
CREATE INDEX `next_video_time_make_idx` ON `next_video`(`time_make`);

-- CreateIndex
CREATE INDEX `next_video_actor_idx` ON `next_video`(`actor`);

-- CreateIndex
CREATE INDEX `next_video_director_idx` ON `next_video`(`director`);

-- CreateIndex
CREATE INDEX `next_video_score_all_idx` ON `next_video`(`score_all`);

-- CreateIndex
CREATE INDEX `next_video_score_num_idx` ON `next_video`(`score_num`);

-- CreateIndex
CREATE INDEX `next_video_total_idx` ON `next_video`(`total`);

-- CreateIndex
CREATE INDEX `next_video_score_idx` ON `next_video`(`score`);

-- CreateIndex
CREATE INDEX `next_video_version_idx` ON `next_video`(`version`);

-- CreateIndex
CREATE INDEX `next_video_state_idx` ON `next_video`(`state`);

-- CreateIndex
CREATE INDEX `next_video_isend_idx` ON `next_video`(`isend`);

-- AddForeignKey
ALTER TABLE `next_user` ADD CONSTRAINT `next_user_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `next_role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `next_category` ADD CONSTRAINT `next_category_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `next_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `next_video` ADD CONSTRAINT `next_video_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `next_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RolePermissions` ADD CONSTRAINT `_RolePermissions_A_fkey` FOREIGN KEY (`A`) REFERENCES `next_permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RolePermissions` ADD CONSTRAINT `_RolePermissions_B_fkey` FOREIGN KEY (`B`) REFERENCES `next_role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
