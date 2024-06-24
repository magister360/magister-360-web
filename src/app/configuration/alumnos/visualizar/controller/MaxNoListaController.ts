import { getMaxNoListaAlumnoApi } from "../services/MaxNoListaService";

export const getMaxNoListaAlumno = async (
  idUsuario: number,
  estatus: number,
  idGrado: number,
  idGrupo: number
) => {
  if (idUsuario <= 0 || idGrado <= 0 || idGrupo <= 0) {
    return -1;
  }

  return getMaxNoListaAlumnoApi(idUsuario, estatus, idGrado, idGrupo);
};
