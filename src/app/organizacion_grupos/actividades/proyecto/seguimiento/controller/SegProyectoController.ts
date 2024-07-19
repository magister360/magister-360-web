import { EstatusProyectoType } from "@/app/estatus/EstatusType";
import { getAlumnosProyectoApi, getFechasProyectoAlumnoApi, getFechasProyectoApi, updateEstatusProyectoApi } from "../service/SegProyectoServices";
import { TypeProyectoFecha } from "@/app/types/proyecto/TypeProyecto";



export const getFechasProyecto = async (
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
    return await getFechasProyectoApi(
      idUsuario,
      idMateria,
      dateStart,
      dateEnd,
      EstatusProyectoType.OK
    );
  } catch (error) {
    return null;
  }
};

export const getFechasProyectoAlumno = async (
  idMateria: number | undefined,
  idUsuario: number | undefined,
  idAlumno: string | undefined,
  fechaInicial: string | undefined,
  fechaFinal: string | undefined
): Promise<TypeProyectoFecha[] | null> => {
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
    return await getFechasProyectoAlumnoApi(
      idMateria,
      idUsuario,
      idAlumno,
      dateStart,
      dateEnd,
      EstatusProyectoType.OK
    );
  } catch (error) {
    return null;
  }
};

export const getAlumnosProyecto = async (
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
    return await getAlumnosProyectoApi(
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

export const updateEstatusProyecto = async (
  id: string|undefined,
  estatus: number
): Promise<{ isSave: boolean; message: string }> => {
  if (id === undefined) {
    return {
      isSave: false,
      message: "No fue posible eliminar la proyecto.",
    };
  }
  return await updateEstatusProyectoApi(id, estatus)
    .then((response) => {
      if (response) {
        return {
          isSave: true,
          message: "El proyecto se elimino con éxito",
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
        message: "No fue posible eliminar el proyecto.",
      };
    });
};


export const createProyecto = async (
  id: string|undefined,
  estatus: number
): Promise<{ isSave: boolean; message: string }> => {
  if (id === undefined) {
    return {
      isSave: false,
      message: "No fue posible eliminar la proyecto.",
    };
  }
  return await updateEstatusProyectoApi(id, estatus)
    .then((response) => {
      if (response) {
        return {
          isSave: true,
          message: "El proyecto se elimino con éxito",
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
        message: "No fue posible eliminar el proyecto.",
      };
    });
};
