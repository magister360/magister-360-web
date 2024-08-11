import { Student } from "@/app/types/alumnos/TypeStudents";
import apiSpringBoot from "../../../../../APISpringBoot";
import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";
import { TypeProyectoCalificacion } from "@/app/types/proyecto/TypeProyecto";

export const downloadExcelApi = async (
  noLista: number[],
  nombres: string[],
  calificaciones: number[]
) => {
  const endpoint = "excel_calificaciones";

  const data = {
    noLista: noLista,
    nombres: nombres,
    calificaciones: calificaciones,
  };

  const response = await apiSpringBoot
    .post(endpoint, data, {
      responseType: "blob",
    })
    .then((response) => {
      return response.status === 200 ? response.data : null;
    })
    .catch((error) => {
      return null;
    });
  return response;
};

export const downloadDocumentApi = async (
  alumnos: Student[],
  participaciones: TypeParticipacionCalificacion[] | null,
  fechasParticipaciones: string[],
  totalParticipaciones: number,
  valueEncuadreParticipacion: number,
  proyectos: TypeProyectoCalificacion[] | null,
  fechasProyectos: string[],
  totalProyectos: number,
  valueEncuadreProyecto: number
) => {
  const endpoint = "document_calificaciones";

  const data = {
    alumnos: alumnos,
    participaciones: participaciones,
    fechasParticipaciones: fechasParticipaciones,
    totalParticipaciones: totalParticipaciones,
    valueEncuadreParticipacion:valueEncuadreParticipacion,
    proyectos: proyectos,
    fechasProyectos: fechasProyectos,
    totalProyectos: totalProyectos,
    valueEncuadreProyecto: valueEncuadreProyecto
  };

  const response = await apiSpringBoot
    .post(endpoint, data, {
      responseType: "blob",
    })
    .then((response) => {
      return response.status === 200 ? response.data : null;
    })
    .catch((error) => {
      return null;
    });
  return response;
};
