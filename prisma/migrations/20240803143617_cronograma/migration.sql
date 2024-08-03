-- CreateTable
CREATE TABLE `Cronograma` (
    `id` VARCHAR(255) NOT NULL,
    `fechaInicial` DATETIME(3) NOT NULL,
    `fechaFinal` DATETIME(3) NOT NULL,
    `contenido` TEXT NOT NULL,
    `idUsuario` INTEGER NOT NULL,
    `idGrado` INTEGER NOT NULL,
    `idGrupo` INTEGER NOT NULL,
    `idMateria` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cronograma` ADD CONSTRAINT `Cronograma_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cronograma` ADD CONSTRAINT `Cronograma_idGrado_fkey` FOREIGN KEY (`idGrado`) REFERENCES `Grado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cronograma` ADD CONSTRAINT `Cronograma_idGrupo_fkey` FOREIGN KEY (`idGrupo`) REFERENCES `Grupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cronograma` ADD CONSTRAINT `Cronograma_idMateria_fkey` FOREIGN KEY (`idMateria`) REFERENCES `Materia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
