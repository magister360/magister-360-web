/*
  Warnings:

  - The primary key for the `iniciosesiones` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `finsesiones` DROP FOREIGN KEY `FinSesiones_idInicioSesion_fkey`;

-- AlterTable
ALTER TABLE `finsesiones` MODIFY `idInicioSesion` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `iniciosesiones` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `FinSesiones` ADD CONSTRAINT `FinSesiones_idInicioSesion_fkey` FOREIGN KEY (`idInicioSesion`) REFERENCES `InicioSesiones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
