-- CreateTable
CREATE TABLE `AlumnoMateria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idAlumno` VARCHAR(191) NOT NULL,
    `idMateria` INTEGER NOT NULL,
    `regDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `AlumnoMateria_idAlumno_idMateria_key`(`idAlumno`, `idMateria`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AlumnoMateria` ADD CONSTRAINT `AlumnoMateria_idAlumno_fkey` FOREIGN KEY (`idAlumno`) REFERENCES `Alumno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlumnoMateria` ADD CONSTRAINT `AlumnoMateria_idMateria_fkey` FOREIGN KEY (`idMateria`) REFERENCES `Materia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
