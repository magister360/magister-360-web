import {
  getAlumnosManualApi,
  getExamenesCalApi,
  updateEstatusExamenApi,
} from "../service/AlumnoServices";

export const getAlumnosManual = async (
  idUsuario: number,
  estatus: number,
  idGrado: number,
  idGrupo: number,
  idMateria: number
) => {
  if (
    idUsuario === undefined ||
    idUsuario === null ||
    idUsuario <= 0 ||
    idGrado === undefined ||
    idGrado === null ||
    idGrado <= 0 ||
    idGrupo === undefined ||
    idGrupo === null ||
    idGrupo <= 0 ||
    idMateria === undefined ||
    idMateria === null ||
    idMateria <= 0
  ) {
    return null;
  }

  return getAlumnosManualApi(
    idUsuario,
    estatus,

    idGrado,
    idGrupo,
    idMateria
  );
};

export const getExamenCalManual = async (
  idUsuario: number,
  estatus: number,
  idGrado: number,
  idGrupo: number,
  idMateria: number,
  noPeriodo: string | undefined
) => {
  if (
    idUsuario === undefined ||
    idUsuario === null ||
    idUsuario <= 0 ||
    idGrado === undefined ||
    idGrado === null ||
    idGrado <= 0 ||
    idGrupo === undefined ||
    idGrupo === null ||
    idGrupo <= 0 ||
    idMateria === undefined ||
    idMateria === null ||
    idMateria <= 0 ||
    noPeriodo === undefined ||
    noPeriodo === null
  ) {
    return null;
  }

  try {
    return await getExamenesCalApi(
      idUsuario,
      estatus,
      idGrado,
      idGrupo,
      idMateria,
      noPeriodo
    );
  } catch (error) {
    return null;
  }
};

export const updateEstatusExamen = async (
  id: string | undefined,
  estatus: number
): Promise<{ isSave: boolean; message: string }> => {
  if (id === undefined || id === null) {
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
