/*
  Warnings:

  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Users` ADD COLUMN `cls` TEXT NOT NULL,
    MODIFY `password` TEXT NOT NULL,
    MODIFY `foto` LONGBLOB NULL;
