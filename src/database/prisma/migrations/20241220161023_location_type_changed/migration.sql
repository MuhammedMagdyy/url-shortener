/*
  Warnings:

  - You are about to alter the column `location` on the `visits` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `visits` MODIFY `location` JSON NULL;
