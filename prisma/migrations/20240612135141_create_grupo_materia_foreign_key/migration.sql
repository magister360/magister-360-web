-- AlterTable
ALTER TABLE `grado` MODIFY `estatus` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `users` MODIFY `estatus` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Grupo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grupo` VARCHAR(191) NOT NULL,
    `estatus` INTEGER NOT NULL DEFAULT 0,
    `regDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idUsuario` INTEGER NOT NULL,

    UNIQUE INDEX `Grupo_grupo_key`(`grupo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Materia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `materia` VARCHAR(255) NOT NULL,
    `estatus` INTEGER NOT NULL DEFAULT 0,
    `regDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idUsuario` INTEGER NOT NULL,

    UNIQUE INDEX `Materia_materia_key`(`materia`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Grupo` ADD CONSTRAINT `Grupo_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materia` ADD CONSTRAINT `Materia_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
