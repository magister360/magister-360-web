/*
  Warnings:

  - Added the required column `tipo` to the `MaterialDidactico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `materialdidactico` ADD COLUMN `tipo` VARCHAR(30) NOT NULL;
