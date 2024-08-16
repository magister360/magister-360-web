import { getAlumnosApi } from "../service/AlumnoService";
import { Student } from "../types/alumnos/TypeStudents";

export const getAlumnos = async (
  idUsuario: number | undefined,
  estatus: number | undefined,
  idGrado: number | undefined,
  idGrupo: number | undefined,
  busqueda: string | undefined,
  idMateria: number | undefined
): Promise<Student[]> => {
  if (
    idGrado === undefined ||
    idGrupo === undefined ||
    idMateria === undefined ||
    estatus === undefined ||
    idUsuario === undefined ||
    busqueda === undefined ||
    busqueda === ""
  ) {
    return [];
  }

  try {
    return await getAlumnosApi(
      idUsuario,
      estatus,
      idGrado,
      idGrupo,
      busqueda,
      idMateria
    );
  } catch (error) {
    return [];
  }
};
