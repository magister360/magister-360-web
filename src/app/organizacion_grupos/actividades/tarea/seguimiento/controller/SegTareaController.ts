


import { EstatusTareaType } from "@/app/estatus/EstatusType";
import { getAlumnosTareaApi, getFechasTareaAlumnoApi, getFechasTareaApi, updateEstatusTareaApi } from "../service/SegTareaService";
import { TypeTareaFecha } from "@/app/types/tarea/TypeTarea";

export const getFechasTarea = async (
  idMateria: number | undefined,
  idUsuario: number | undefined,
  fechaInicial: string | undefined,
  fechaFinal: string | undefined
): Promise<any> => {
  if (
    idMateria === undefined ||
    idUsuario === undefined ||
    idMateria <= 0 ||
    idUsuario <= 0 ||
    fechaInicial === undefined ||
    fechaFinal === undefined
  ) {
    return null;
  }

  try {
    const dateStart = new Date(fechaInicial);
    const dateEnd = new Date(fechaFinal);
    return await getFechasTareaApi(
      idUsuario,
      idMateria,
      dateStart,
      dateEnd,
      EstatusTareaType.OK
    );
  } catch (error) {
    return null;
  }
};

export const getFechasTareaAlumno = async (
  idMateria: number | undefined,
  idUsuario: number | undefined,
  idAlumno: string | undefined,
  fechaInicial: string | undefined,
  fechaFinal: string | undefined
): Promise<TypeTareaFecha[] | null> => {
  if (
    idMateria === undefined ||
    idUsuario === undefined ||
    idMateria <= 0 ||
    idUsuario <= 0 ||
    fechaInicial === undefined ||
    fechaFinal === undefined ||
    idAlumno === undefined
  ) {
    return null;
  }

  try {
    const dateStart = new Date(fechaInicial);
    const dateEnd = new Date(fechaFinal);
    return await getFechasTareaAlumnoApi(
      idMateria,
      idUsuario,
      idAlumno,
      dateStart,
      dateEnd,
      EstatusTareaType.OK
    );
  } catch (error) {
    return null;
  }
};

export const getAlumnosTarea = async (
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
    return await getAlumnosTareaApi(
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

export const updateEstatusTarea = async (
  id: string|undefined,
  estatus: number
): Promise<{ isSave: boolean; message: string }> => {
  if (id === undefined) {
    return {
      isSave: false,
      message: "No fue posible eliminar la tarea.",
    };
  }
  return await updateEstatusTareaApi(id, estatus)
    .then((response) => {
      if (response) {
        return {
          isSave: true,
          message: "La tarea se elimino con éxito",
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
        message: "No fue posible eliminar la tarea.",
      };
    });
};


export const createTarea = async (
  id: string|undefined,
  estatus: number
): Promise<{ isSave: boolean; message: string }> => {
  if (id === undefined) {
    return {
      isSave: false,
      message: "No fue posible eliminar la tarea.",
    };
  }
  return await updateEstatusTareaApi(id, estatus)
    .then((response) => {
      if (response) {
        return {
          isSave: true,
          message: "La tarea se elimino con éxito",
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
        message: "No fue posible eliminar la tarea.",
      };
    });
};
