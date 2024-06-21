import { getAlumnosApi } from "../services/AlumnosService";

export const getAlumnos = async (
  idUsuario: number,
  estatusAlta: number,
  estatusBaja: number,
  estatusCambio: number,
  idGrado: number,
  idGrupo: number
) => {

  if (idUsuario <= 0 || idGrado <= 0 || idGrupo <= 0) {
    return null;
  }

  return getAlumnosApi(
    idUsuario,
    estatusAlta,
    estatusBaja,
    estatusCambio,
    idGrado,
    idGrupo
  );
};
