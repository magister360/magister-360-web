import { TypeParticipacion } from "@/app/types/participacion/TypeParticipacion";
import {
  getAlumnosParticipacionApi,
  getFechasParticipacionAlumnoApi,
  getFechasParticipacionApi,
} from "../service/SegParticipacionService";

export const getFechasParticipacion = async (
  idMateria: number | undefined,
  idUsuario: number | undefined,
  fechaInicial: string | undefined,
  fechaFinal: string | undefined
): Promise<any> => {
  if (
    idMateria === undefined ||
    idUsuario === undefined ||
    idMateria <= 0 ||
    idUsuario <= 0 ||
    fechaInicial === undefined ||
    fechaFinal === undefined
  ) {
    return null;
  }

  try {
    const dateStart = new Date(fechaInicial);
    const dateEnd = new Date(fechaFinal);
    return await getFechasParticipacionApi(
      idUsuario,
      idMateria,
      dateStart,
      dateEnd
    );
  } catch (error) {
    return null;
  }
};

export const getFechasParticipacionAlumno = async (
  idMateria: number|undefined,
  idUsuario: number|undefined,
  idAlumno: string|undefined,
  fechaInicial: string | undefined,
  fechaFinal: string | undefined
): Promise<TypeParticipacion[]|null> => {
  if (
    idMateria === undefined ||
    idUsuario === undefined ||
    idMateria <= 0 ||
    idUsuario <= 0 ||
    fechaInicial === undefined ||
    fechaFinal === undefined ||
    idAlumno === undefined
  ) {
    return null;
  }

  try {
    const dateStart = new Date(fechaInicial);
    const dateEnd = new Date(fechaFinal);
    return await getFechasParticipacionAlumnoApi(
      idMateria,
      idUsuario,
      idAlumno,
      dateStart,
      dateEnd
    );
  } catch (error) {
    return null;
  }
};

export const getAlumnosParticipacion = async (
  idUsuario: number,
  estatus: number,
  idGrado: number,
  idGrupo: number,
  busqueda: string,
  idMateria: number
): Promise<any> => {
  if (
    idMateria <= 0 ||
    idUsuario <= 0 ||
    busqueda === undefined ||
    busqueda === ""
  ) {
    return null;
  }

  try {
    return await getAlumnosParticipacionApi(
      idUsuario,
      estatus,
      idGrado,
      idGrupo,
      busqueda,
      idMateria
    );
  } catch (error) {
    return null;
  }
};
