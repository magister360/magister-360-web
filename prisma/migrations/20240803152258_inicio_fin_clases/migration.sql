-- CreateTable
CREATE TABLE `InicioFinClases` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaInicial` DATETIME(3) NOT NULL,
    `fechaFinal` DATETIME(3) NOT NULL,
    `idUsuario` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InicioFinClases` ADD CONSTRAINT `InicioFinClases_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
