-- AlterTable
ALTER TABLE `asistencias` ADD COLUMN `estatus` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `fechaActualizacion` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `examenes` ADD COLUMN `estatus` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `fechaActualizacion` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `participaciones` ADD COLUMN `estatus` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `fechaActualizacion` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `proyectos` ADD COLUMN `estatus` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `fechaActualizacion` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `tareas` ADD COLUMN `estatus` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `fechaActualizacion` DATETIME(3) NULL;
