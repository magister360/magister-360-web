import { getAlumnosManualApi } from "../services/AlumnoServices";

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
