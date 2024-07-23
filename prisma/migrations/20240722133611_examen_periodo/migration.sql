/*
  Warnings:

  - You are about to drop the column `fecha` on the `examenes` table. All the data in the column will be lost.
  - Added the required column `noPeriodo` to the `Examenes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `examenes` DROP COLUMN `fecha`,
    ADD COLUMN `noPeriodo` INTEGER NOT NULL;
