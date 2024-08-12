import { Student } from "@/app/types/alumnos/TypeStudents";
import {
  downloadDocumentApi,
  downloadExcelApi,
} from "../services/DownloadService";
import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";
import { TypeProyectoCalificacion } from "@/app/types/proyecto/TypeProyecto";
import { TypeTareaCalificacion } from "@/app/types/tarea/TypeTarea";
import { TypeExamenCalificacion } from "@/app/types/examen/TypeExamen";
import { TypePuntoExtraCalificacion } from "@/app/types/puntos_extra/TypePuntoExtra";

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
  valueEncuadreProyecto: number,
  tareas: TypeTareaCalificacion[] | null,
  fechasTareas: string[],
  totalTareas: number,
  valueEncuadreTarea: number,
  examenes: TypeExamenCalificacion[] | null,
  noPeriodo:number|undefined,
  valueEncuadreExamen: number,
  puntosExtra: TypePuntoExtraCalificacion[] | null
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
    valueEncuadreProyecto,
    tareas,
    fechasTareas,
    totalTareas,
    valueEncuadreTarea,
    examenes,
    noPeriodo,
    valueEncuadreExamen,
    puntosExtra
  );
};
