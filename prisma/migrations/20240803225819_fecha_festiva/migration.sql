-- CreateTable
CREATE TABLE `FechaFestiva` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `actividad` TEXT NOT NULL,
    `idUsuario` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FechaFestiva` ADD CONSTRAINT `FechaFestiva_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
