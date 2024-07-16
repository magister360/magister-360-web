import {
  getAlumnosParticipacionApi,
  getFechasParticipacionApi,
} from "../service/SegParticipacionService";

export const getFechasParticipacion = async (
  idMateria: number,
  idUsuario: number
): Promise<any> => {
  if (idMateria <= 0 || idUsuario <= 0) {
    return null;
  }

  try {
    return await getFechasParticipacionApi(idUsuario, idMateria);
  } catch (error) {
    return null;
  }
};

export const getFechasParticipacionAlumno = async (
  idMateria: number,
  idUsuario: number,
  idAlumno: string
): Promise<any> => {
  if (idMateria <= 0 || idUsuario <= 0 || idAlumno === undefined) {
    return null;
  }

  try {
    return await getFechasParticipacionApi(idUsuario, idMateria);
  } catch (error) {
    return null;
  }
};

export const getAlumnosParticipacion = async (
  idUsuario: number,
  estatus: number,
  idGrado: number,
  idGrupo: number,
  busqueda: string,
  idMateria: number
): Promise<any> => {
  if (idMateria <= 0 || idUsuario <= 0 || busqueda === undefined||busqueda==='') {
    return null;
  }

  try {
    return await getAlumnosParticipacionApi(
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
