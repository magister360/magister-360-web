import { getAlumnosApi } from "../services/AlumnosService";

export const getAlumnos = async (
  idUsuario: number | undefined,
  estatus: number | undefined,
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idMateria: number | undefined,
  orderStudents: string | undefined
) => {
  if (
    idUsuario === undefined ||
    idGrado === undefined ||
    idGrupo === undefined ||
    idMateria === undefined ||
    estatus === undefined ||
    orderStudents === undefined
  ) {
    return null;
  }

  return getAlumnosApi(
    idUsuario,
    estatus,
    idGrado,
    idGrupo,
    idMateria,
    orderStudents
  );
};
