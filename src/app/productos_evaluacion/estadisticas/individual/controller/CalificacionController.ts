import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";
import {
  calificacionExamenApi,
  calificacionParticipacionApi,
  calificacionProyectoApi,
  calificacionPuntoExtraApi,
  calificacionTareaApi,
  getFechasParticipacionApi,
  getFechasTareaApi,
} from "../services/CalificacionService";
import { EstatusParticipacionType } from "@/app/estatus/EstatusType";
import { TypeTareaCalificacion } from "@/app/types/tarea/TypeTarea";
import { TypeProyectoCalificacion } from "@/app/types/proyecto/TypeProyecto";
import { TypeExamenCalificacion } from "@/app/types/examen/TypeExamen";
import { TypePuntoExtraCalificacion } from "@/app/types/puntos_extra/TypePuntoExtra";

type Props = {
  readonly idUsuario: number | undefined;
  readonly idMateria: number | undefined;
  readonly idGrado: number | undefined;
  readonly idGrupo: number | undefined;
  readonly fechaInicial: string | undefined;
  readonly fechaFinal: string | undefined;
  readonly estatus: number;
  readonly idAlumno: string | undefined;
};

export const calificacionParticipacion = async ({
  idUsuario,
  idMateria,
  idGrado,
  idGrupo,
  fechaInicial,
  fechaFinal,
  estatus,
  idAlumno,
}: Props): Promise<TypeParticipacionCalificacion[]> => {
  if (
    idUsuario === undefined ||
    idMateria === undefined ||
    idGrado === undefined ||
    idGrupo === undefined ||
    fechaInicial === undefined ||
    fechaFinal === undefined ||
    estatus === undefined ||
    idAlumno === undefined
  ) {
    return [];
  }
  return await calificacionParticipacionApi(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
    estatus,
    idAlumno
  );
};

export const getFechasParticipacion = async (
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idMateria: number | undefined,
  idUsuario: number | undefined,
  fechaInicial: string | undefined,
  fechaFinal: string | undefined
): Promise<string[]> => {
  if (
    idGrado === undefined ||
    idGrupo === undefined ||
    idMateria === undefined ||
    idUsuario === undefined ||
    idMateria <= 0 ||
    idUsuario <= 0 ||
    fechaInicial === undefined ||
    fechaFinal === undefined
  ) {
    return [];
  }

  try {
    const dateStart = new Date(fechaInicial);
    const dateEnd = new Date(fechaFinal);
    return await getFechasParticipacionApi(
      idGrado,
      idGrupo,
      idUsuario,
      idMateria,
      dateStart,
      dateEnd,
      EstatusParticipacionType.OK
    );
  } catch (error) {
    return [];
  }
};

/****Taeeas */

type PropsTarea = {
  readonly idUsuario: number | undefined;
  readonly idMateria: number | undefined;
  readonly idGrado: number | undefined;
  readonly idGrupo: number | undefined;
  readonly fechaInicial: string | undefined;
  readonly fechaFinal: string | undefined;
  readonly estatus: number;
  readonly idAlumno: string | undefined;
};

export const calificacionTarea = async ({
  idUsuario,
  idMateria,
  idGrado,
  idGrupo,
  fechaInicial,
  fechaFinal,
  estatus,
  idAlumno,
}: PropsTarea): Promise<TypeTareaCalificacion[]> => {
  if (
    idUsuario === undefined ||
    idMateria === undefined ||
    idGrado === undefined ||
    idGrupo === undefined ||
    fechaInicial === undefined ||
    fechaFinal === undefined ||
    estatus === undefined ||
    idAlumno === undefined
  ) {
    return [];
  }
  return await calificacionTareaApi(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
    estatus,
    idAlumno
  );
};

export const getFechasTarea = async (
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idMateria: number | undefined,
  idUsuario: number | undefined,
  fechaInicial: string | undefined,
  fechaFinal: string | undefined
): Promise<string[]> => {
  if (
    idGrado === undefined ||
    idGrupo === undefined ||
    idMateria === undefined ||
    idUsuario === undefined ||
    idMateria <= 0 ||
    idUsuario <= 0 ||
    fechaInicial === undefined ||
    fechaFinal === undefined
  ) {
    return [];
  }

  try {
    const dateStart = new Date(fechaInicial);
    const dateEnd = new Date(fechaFinal);
    return await getFechasTareaApi(
      idGrado,
      idGrupo,
      idUsuario,
      idMateria,
      dateStart,
      dateEnd,
      EstatusParticipacionType.OK
    );
  } catch (error) {
    return [];
  }
};

/****Proyectos */

type PropsProyecto = {
  readonly idUsuario: number | undefined;
  readonly idMateria: number | undefined;
  readonly idGrado: number | undefined;
  readonly idGrupo: number | undefined;
  readonly fechaInicial: string | undefined;
  readonly fechaFinal: string | undefined;
  readonly estatus: number;
  readonly idAlumno: string | undefined;
};

export const calificacionProyecto = async ({
  idUsuario,
  idMateria,
  idGrado,
  idGrupo,
  fechaInicial,
  fechaFinal,
  estatus,
  idAlumno,
}: PropsProyecto): Promise<TypeProyectoCalificacion[]> => {
  if (
    idUsuario === undefined ||
    idMateria === undefined ||
    idGrado === undefined ||
    idGrupo === undefined ||
    fechaInicial === undefined ||
    fechaFinal === undefined ||
    estatus === undefined ||
    idAlumno === undefined
  ) {
    return [];
  }
  return await calificacionProyectoApi(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
    estatus,
    idAlumno
  );
};

/****Examenes */

type PropsExamen = {
  readonly idUsuario: number | undefined;
  readonly idMateria: number | undefined;
  readonly idGrado: number | undefined;
  readonly idGrupo: number | undefined;
  readonly noPeriodo: number | undefined;
  readonly estatus: number;
  readonly idAlumno: string | undefined;
};

export const calificacionExamen = async ({
  idUsuario,
  idMateria,
  idGrado,
  idGrupo,
  noPeriodo,
  estatus,
  idAlumno,
}: PropsExamen): Promise<TypeExamenCalificacion[]> => {
  if (
    idUsuario === undefined ||
    idMateria === undefined ||
    idGrado === undefined ||
    idGrupo === undefined ||
    noPeriodo === undefined ||
    estatus === undefined ||
    idAlumno === undefined
  ) {
    return [];
  }
  return await calificacionExamenApi(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    noPeriodo,
    estatus,
    idAlumno
  );
};


/****Puntos extra */

type PropsPuntoExtra = {
  readonly idUsuario: number | undefined;
  readonly idMateria: number | undefined;
  readonly idGrado: number | undefined;
  readonly idGrupo: number | undefined;
  readonly fechaInicial: string | undefined;
  readonly fechaFinal: string | undefined;
  readonly estatus: number;
  readonly idAlumno: string | undefined;
};

export const calificacionPuntoExtra = async ({
  idUsuario,
  idMateria,
  idGrado,
  idGrupo,
  fechaInicial,
  fechaFinal,
  estatus,
  idAlumno,
}: PropsPuntoExtra): Promise<TypePuntoExtraCalificacion[]> => {
  if (
    idUsuario === undefined ||
    idMateria === undefined ||
    idGrado === undefined ||
    idGrupo === undefined ||
    fechaInicial === undefined ||
    fechaFinal === undefined ||
    estatus === undefined ||
    idAlumno === undefined
  ) {
    return [];
  }
  return await calificacionPuntoExtraApi(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
    estatus,
    idAlumno
  );
};