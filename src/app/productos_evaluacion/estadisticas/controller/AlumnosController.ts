import { Student } from "@/app/types/alumnos/TypeStudents";
import { getAlumnosApi } from "../services/AlumnosService";

export const getAlumnos = async (
  idUsuario: number | undefined,
  estatus: number | undefined,
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idMateria: number | undefined
): Promise<Student[] | null> => {
  if (
    idUsuario === undefined ||
    estatus === undefined ||
    idGrado === undefined ||
    idGrupo === undefined ||
    idMateria === undefined
  ) {
    return null;
  }

  return getAlumnosApi(
    idUsuario,
    estatus,

    idGrado,
    idGrupo,
    idMateria
  );
};
