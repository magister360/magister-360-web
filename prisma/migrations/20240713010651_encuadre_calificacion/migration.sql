-- CreateTable
CREATE TABLE `EncuadreCalificacion` (
    `id` VARCHAR(255) NOT NULL,
    `json` VARCHAR(191) NOT NULL,
    `puntosExtra` VARCHAR(191) NOT NULL,
    `estatus` INTEGER NOT NULL DEFAULT 0,
    `regDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idUsuario` INTEGER NOT NULL,
    `idGrado` INTEGER NOT NULL,
    `idGrupo` INTEGER NOT NULL,
    `idMateria` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EncuadreCalificacion` ADD CONSTRAINT `EncuadreCalificacion_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EncuadreCalificacion` ADD CONSTRAINT `EncuadreCalificacion_idGrado_fkey` FOREIGN KEY (`idGrado`) REFERENCES `Grado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EncuadreCalificacion` ADD CONSTRAINT `EncuadreCalificacion_idGrupo_fkey` FOREIGN KEY (`idGrupo`) REFERENCES `Grupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EncuadreCalificacion` ADD CONSTRAINT `EncuadreCalificacion_idMateria_fkey` FOREIGN KEY (`idMateria`) REFERENCES `Materia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
