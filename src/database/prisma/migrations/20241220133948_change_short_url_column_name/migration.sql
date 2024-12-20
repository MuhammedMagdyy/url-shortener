/*
  Warnings:

  - You are about to drop the column `short_url` on the `urls` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[short_code]` on the table `urls` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `short_code` to the `urls` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `short_url` ON `urls`;

-- DropIndex
DROP INDEX `urls_short_url_key` ON `urls`;

-- AlterTable
ALTER TABLE `urls` DROP COLUMN `short_url`,
    ADD COLUMN `short_code` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `urls_short_code_key` ON `urls`(`short_code`);

-- CreateIndex
CREATE INDEX `short_code` ON `urls`(`short_code`);
