import {
  getAlumnosManualApi,
  getParticipacionesCalApi,
  updateEstatusParticipacionApi,
} from "../services/AlumnoServices";

export const getAlumnosManual = async (
  idUsuario: number,
  estatus: number,
  idGrado: number,
  idGrupo: number,
  idMateria: number
) => {
  if (idUsuario <= 0 || idGrado <= 0 || idGrupo <= 0 || idMateria <= 0) {
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

export const getParticipacionesCalManual = async (
  idUsuario: number,
  estatus: number,
  idGrado: number,
  idGrupo: number,
  idMateria: number,
  fecha: string | null
) => {
  if (
    idUsuario <= 0 ||
    idGrado <= 0 ||
    idGrupo <= 0 ||
    idMateria <= 0 ||
    fecha === null
  ) {
    return null;
  }

  try {
    const date = new Date(fecha);
    return getParticipacionesCalApi(
      idUsuario,
      estatus,
      idGrado,
      idGrupo,
      idMateria,
      date
    );
  } catch (error) {
    return null;
  }
};

export const updateEstatusParticipacion = async (
  id: string | undefined,
  estatus: number
): Promise<{ isSave: boolean; message: string }> => {

  if (id === undefined) {
    return {
      isSave: false,
      message: "No fue posible eliminar la participación.",
    };
  }

  return await updateEstatusParticipacionApi(id, estatus)
    .then((response) => {
      if (response) {
        return {
          isSave: true,
          message: "La participación se elimino con éxito",
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
        message: "No fue posible eliminar la participación.",
      };
    });
};
