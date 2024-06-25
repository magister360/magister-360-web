-- CreateTable
CREATE TABLE `MaterialDidactico` (
    `id` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `titulo` VARCHAR(255) NOT NULL,
    `descripcion` VARCHAR(255) NOT NULL,
    `miniatura` BLOB NOT NULL,
    `file` BLOB NOT NULL,
    `regDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idGrado` INTEGER NOT NULL,
    `idGrupo` INTEGER NOT NULL,
    `idMateria` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MaterialDidactico` ADD CONSTRAINT `MaterialDidactico_idGrado_fkey` FOREIGN KEY (`idGrado`) REFERENCES `Grado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialDidactico` ADD CONSTRAINT `MaterialDidactico_idGrupo_fkey` FOREIGN KEY (`idGrupo`) REFERENCES `Grupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialDidactico` ADD CONSTRAINT `MaterialDidactico_idMateria_fkey` FOREIGN KEY (`idMateria`) REFERENCES `Materia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
