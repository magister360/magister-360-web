-- CreateTable
CREATE TABLE `PuntoExtra` (
    `id` VARCHAR(255) NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `fechaRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaActualizacion` DATETIME(3) NULL,
    `calificacion` DOUBLE NOT NULL,
    `contenido` TEXT NOT NULL,
    `estatus` INTEGER NOT NULL DEFAULT 0,
    `idAlumno` VARCHAR(191) NOT NULL,
    `idUsuario` INTEGER NOT NULL,
    `idMateria` INTEGER NOT NULL,

    INDEX `PuntoExtra_idAlumno_idMateria_idx`(`idAlumno`, `idMateria`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PuntoExtra` ADD CONSTRAINT `PuntoExtra_idAlumno_fkey` FOREIGN KEY (`idAlumno`) REFERENCES `Alumno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PuntoExtra` ADD CONSTRAINT `PuntoExtra_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PuntoExtra` ADD CONSTRAINT `PuntoExtra_idMateria_fkey` FOREIGN KEY (`idMateria`) REFERENCES `Materia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
