/*
  Warnings:

  - You are about to drop the column `estadoClase` on the `cronograma` table. All the data in the column will be lost.
  - You are about to drop the column `fechaFinal` on the `cronograma` table. All the data in the column will be lost.
  - You are about to drop the column `fechaInicial` on the `cronograma` table. All the data in the column will be lost.
  - Added the required column `mes` to the `Cronograma` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cronograma` DROP COLUMN `estadoClase`,
    DROP COLUMN `fechaFinal`,
    DROP COLUMN `fechaInicial`,
    ADD COLUMN `mes` VARCHAR(255) NOT NULL;
