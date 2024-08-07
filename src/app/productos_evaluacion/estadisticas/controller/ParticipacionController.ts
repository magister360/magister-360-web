import { TypeParticipacionFecha } from "@/app/types/participacion/TypeParticipacion";
import { countParticipacionesApi, getParticipacionesApi } from "../services/ParticipacionService";

export const getParticipaciones = async (
  idUsuario: number | undefined,
  idMateria: number | undefined,
  idGrado: number | undefined,
  idGrupo: number | undefined,
  fechaInicial: string|undefined,
  fechaFinal: string|undefined,
  estatus: number
): Promise<TypeParticipacionFecha[] | null> => {

  if (
    idUsuario === undefined ||
    idGrado === undefined ||
    idMateria === undefined ||
    idGrupo === undefined||
    fechaInicial === undefined ||
    fechaFinal === undefined
  ) {
    return null;
  }

  return await getParticipacionesApi(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
    estatus
  );
};

export const countParticipaciones = async (
  idUsuario: number | undefined,
  idMateria: number | undefined,
  idGrado: number | undefined,
  idGrupo: number | undefined,
  fechaInicial: string|undefined,
  fechaFinal: string|undefined,
  estatus: number
): Promise<number> => {

  if (
    idUsuario === undefined ||
    idGrado === undefined ||
    idMateria === undefined ||
    idGrupo === undefined||
    fechaInicial === undefined ||
    fechaFinal === undefined
  ) {
    return 0;
  }

  return await countParticipacionesApi(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
    estatus
  );
};