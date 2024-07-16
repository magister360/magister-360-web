import { v4 as uuidv4 } from "uuid";
import {
  createEncuadreCalificacion,
  updateEncuadreCalificacion,
} from "../controller/EncuadreCalificacionController";

interface EncuadreCalificacionParams {
  userId: number;
  idGrado: number | undefined;
  idGrupo: number | undefined;
  idMateria: number | undefined;
  participaciones: { isChecked: boolean; value: number };
  tareas: { isChecked: boolean; value: number };
  examenes: { isChecked: boolean; value: number };
  proyectos: { isChecked: boolean; value: number };
  sum: number;
  isCheckedPuntosExtra: boolean;
  isCheckedRedondear: boolean;
  id: string | undefined;
  setSelectGrado?: React.Dispatch<
    React.SetStateAction<{ idGrado: number; grado: string }>
  >;
  setSelectGrupo?: React.Dispatch<
    React.SetStateAction<{ idGrupo: number; grupo: string }>
  >;
  setSelectMateria?: React.Dispatch<
    React.SetStateAction<{ idMateria: number; materia: string }>
  >;
}

export const handleSubmitEncuadreCalificacion = async ({
  userId,
  idGrado,
  idGrupo,
  idMateria,
  participaciones,
  tareas,
  examenes,
  proyectos,
  sum,
  isCheckedPuntosExtra,
  isCheckedRedondear,
  id,
}: EncuadreCalificacionParams): Promise<{
  success: boolean;
  message: string;
}> => {
  if (sum !== 100) {
    return {
      success: false,
      message: "El porcentaje es incorrecto",
    };
  }

  try {
    const rubricaData = {
      participaciones: {
        isChecked: participaciones.isChecked,
        value: participaciones.isChecked ? participaciones.value : 0,
      },
      tareas: {
        isChecked: tareas.isChecked,
        value: tareas.isChecked ? tareas.value : 0,
      },
      examenes: {
        isChecked: examenes.isChecked,
        value: examenes.isChecked ? examenes.value : 0,
      },
      proyectos: {
        isChecked: proyectos.isChecked,
        value: proyectos.isChecked ? proyectos.value : 0,
      },
    };

    const rubricaJSON = JSON.stringify(rubricaData);

    const configuracionPuntosExtra = {
      isCheckedPuntosExtra: isCheckedPuntosExtra,
      isCheckedRedondear: isCheckedRedondear,
    };

    const configuracionPuntosExtraJSON = JSON.stringify(
      configuracionPuntosExtra
    );
    if (id === undefined) {
      const saved = await createEncuadreCalificacion(
        uuidv4(),
        rubricaJSON,
        configuracionPuntosExtraJSON,
        0,
        userId,
        idGrado ?? -1,
        idGrupo ?? -1,
        idMateria ?? -1
      );

      if (saved) {
        return {
          success: true,
          message: "El encuadre de calificación se guardó con éxito.",
        };
      } else {
        return {
          success: false,
          message:
            "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.",
        };
      }
    } else {
      const saved = await updateEncuadreCalificacion(
        id,
        rubricaJSON,
        configuracionPuntosExtraJSON
      );
      if (saved) {
        return {
          success: true,
          message: "El encuadre de calificación se modifico con éxito.",
        };
      } else {
        return {
          success: false,
          message:
            "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.",
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      message:
        "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.",
    };
  }
};
