import { Student } from "@/app/types/alumnos/TypeStudents";
import {
  downloadDocumentApi,
  downloadExcelApi,
} from "../services/DownloadService";
import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";
import { TypeProyectoCalificacion } from "@/app/types/proyecto/TypeProyecto";

export const downloadExcelApiCall = async (
  noLista: number[],
  nombres: string[],
  calificaciones: number[]
): Promise<any> => {
  return downloadExcelApi(noLista, nombres, calificaciones);
};

export const downloadDocumentApiCall = async (
  alumnos: Student[] | null,
  participaciones: TypeParticipacionCalificacion[] | null,
  fechasParticipaciones: string[],
  totalParticipaciones: number,
  valueEncuadreParticipacion: number,
  proyectos: TypeProyectoCalificacion[] | null,
  fechasProyectos: string[],
  totalProyectos: number,
  valueEncuadreProyecto: number
): Promise<any> => {
  if (!alumnos) {
    return null;
  }

  
  return downloadDocumentApi(
    alumnos,
    participaciones,
    fechasParticipaciones,
    totalParticipaciones,
    valueEncuadreParticipacion,
    proyectos,
    fechasProyectos,
    totalProyectos,
    valueEncuadreProyecto
  );
};
