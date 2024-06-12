-- CreateTable
CREATE TABLE `Grado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grado` VARCHAR(191) NOT NULL,
    `estatus` INTEGER NOT NULL,
    `regDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idUsuario` INTEGER NOT NULL,

    UNIQUE INDEX `Grado_grado_key`(`grado`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Grado` ADD CONSTRAINT `Grado_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
