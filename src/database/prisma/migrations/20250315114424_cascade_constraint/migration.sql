-- DropForeignKey
ALTER TABLE `urls` DROP FOREIGN KEY `urls_user_uuid_fkey`;

-- DropForeignKey
ALTER TABLE `visits` DROP FOREIGN KEY `visits_url_uuid_fkey`;

-- AddForeignKey
ALTER TABLE `urls` ADD CONSTRAINT `urls_user_uuid_fkey` FOREIGN KEY (`user_uuid`) REFERENCES `users`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `visits` ADD CONSTRAINT `visits_url_uuid_fkey` FOREIGN KEY (`url_uuid`) REFERENCES `urls`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;
