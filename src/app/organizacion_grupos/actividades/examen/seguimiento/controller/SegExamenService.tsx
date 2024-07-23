import { EstatusExamenType } from "@/app/estatus/EstatusType";
import {
  getAlumnosExamenApi,
  getPeriodosExamenAlumnoApi,
  updateEstatusExamenApi,
} from "../services/SegExamenService";
import { TypeExamenPeriodo } from "@/app/types/examen/TypeExamen";

export const getPeriodosExamenAlumno = async (
  idMateria: number | undefined,
  idUsuario: number | undefined,
  idAlumno: string | undefined,
  noPeriodo: number | undefined,
): Promise<TypeExamenPeriodo[] | null> => {
  if (
    idMateria === undefined ||
    idUsuario === undefined ||
    idMateria <= 0 ||
    idUsuario <= 0 ||
    noPeriodo === undefined ||
    idAlumno === undefined
  ) {
    return null;
  }

  try {

    return await getPeriodosExamenAlumnoApi(
      idMateria,
      idUsuario,
      idAlumno,
      noPeriodo,
      EstatusExamenType.OK
    );
  } catch (error) {
    return null;
  }
};

export const getAlumnosExamen = async (
  idUsuario: number,
  estatus: number,
  idGrado: number,
  idGrupo: number,
  busqueda: string,
  idMateria: number
): Promise<any> => {
  if (
    idMateria <= 0 ||
    idUsuario <= 0 ||
    busqueda === undefined ||
    busqueda === ""
  ) {
    return null;
  }

  try {
    return await getAlumnosExamenApi(
      idUsuario,
      estatus,
      idGrado,
      idGrupo,
      busqueda,
      idMateria
    );
  } catch (error) {
    return null;
  }
};

export const updateEstatusExamen = async (
  id: string | undefined,
  estatus: number
): Promise<{ isSave: boolean; message: string }> => {
  if (id === undefined) {
    return {
      isSave: false,
      message: "No fue posible eliminar el examen.",
    };
  }
  return await updateEstatusExamenApi(id, estatus)
    .then((response) => {
      if (response) {
        return {
          isSave: true,
          message: "El examen se elimino con éxito",
        };
      } else {
        return {
          isSave: false,
          message:
            "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.",
        };
      }
    })
    .catch((error) => {
      return {
        isSave: false,
        message: "No fue posible eliminar el examen.",
      };
    });
};

export const createParticipacion = async (
  id: string | undefined,
  estatus: number
): Promise<{ isSave: boolean; message: string }> => {
  if (id === undefined) {
    return {
      isSave: false,
      message: "No fue posible eliminar la examen.",
    };
  }
  return await updateEstatusExamenApi(id, estatus)
    .then((response) => {
      if (response) {
        return {
          isSave: true,
          message: "El Examen se elimino con éxito",
        };
      } else {
        return {
          isSave: false,
          message:
            "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.",
        };
      }
    })
    .catch((error) => {
      return {
        isSave: false,
        message: "No fue posible eliminar la examen.",
      };
    });
};
