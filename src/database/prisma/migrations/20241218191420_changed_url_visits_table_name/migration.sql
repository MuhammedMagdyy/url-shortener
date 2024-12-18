/*
  Warnings:

  - You are about to drop the `url_visits` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `url_visits` DROP FOREIGN KEY `url_visits_url_uuid_fkey`;

-- DropTable
DROP TABLE `url_visits`;

-- CreateTable
CREATE TABLE `visits` (
    `id` VARCHAR(191) NOT NULL,
    `url_uuid` VARCHAR(191) NOT NULL,
    `accessed_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_ip` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `url_id`(`url_uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `visits` ADD CONSTRAINT `visits_url_uuid_fkey` FOREIGN KEY (`url_uuid`) REFERENCES `urls`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
