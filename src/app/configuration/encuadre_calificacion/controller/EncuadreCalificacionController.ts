import {
  createEncuadreCalificacionApi,
  getEncuadreCalificacionApi,
  putEncuadreCalificacionApi,
} from "../service/EncuadreCalificacionService";

export const createEncuadreCalificacion = async (
  id: string,
  json: string,
  puntosExtra: string,
  estatus: number,
  idUsuario: number,
  idGrado: number,
  idGrupo: number,
  idMateria: number
): Promise<boolean> => {
  if (
    json === undefined ||
    puntosExtra === undefined ||
    idUsuario <= 0 ||
    idGrado <= 0 ||
    idGrupo <= 0 ||
    idMateria <= 0
  ) {
    return false;
  }
  return createEncuadreCalificacionApi(
    id,
    json,
    puntosExtra,
    estatus,
    idUsuario,
    idGrado,
    idGrupo,
    idMateria
  );
};

export const updateEncuadreCalificacion = async (
  id: string,
  json: string,
  puntosExtra: string,

): Promise<boolean> => {
  if (
    json === undefined ||
    puntosExtra === undefined ||
    id===undefined
  ) {
    return false;
  }
  return putEncuadreCalificacionApi(
    id,
    json,
    puntosExtra,
   
  );
};

export const getEncuadreCalificacion = async (
  idGrado: number,
  idGrupo: number,
  idMateria: number,
  idUsuario: number
): Promise<any> => {
  if (idGrado <= 0 || idGrupo <= 0 || idMateria <= 0 || idUsuario <= 0) {
    return null;
  }

  try {
    return await getEncuadreCalificacionApi(
      idGrado,
      idGrupo,
      idMateria,
      idUsuario
    );
  } catch (error) {
    return null;
  }
};
