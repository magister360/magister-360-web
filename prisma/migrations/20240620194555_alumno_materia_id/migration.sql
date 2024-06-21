/*
  Warnings:

  - The primary key for the `alumnomateria` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `alumnomateria` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`id`);
