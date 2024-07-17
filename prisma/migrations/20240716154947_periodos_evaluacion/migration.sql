-- CreateTable
CREATE TABLE `PeriodosEvaluacion` (
    `id` VARCHAR(255) NOT NULL,
    `noPeriodo` INTEGER NOT NULL,
    `fechaInicial` DATETIME(3) NOT NULL,
    `fechaFinal` DATETIME(3) NOT NULL,
    `fechaRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actividad` VARCHAR(255) NOT NULL,
    `estatus` INTEGER NOT NULL DEFAULT 0,
    `idUsuario` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PeriodosEvaluacion` ADD CONSTRAINT `PeriodosEvaluacion_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
