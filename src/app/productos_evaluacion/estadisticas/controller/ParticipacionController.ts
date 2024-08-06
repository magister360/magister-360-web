import { TypeParticipacionFecha } from "@/app/types/participacion/TypeParticipacion";

export const getParticipacionesApi = async (
  idUsuario: number | undefined,
  idMateria: number | undefined,
  idGrado: number | undefined,
  idGrupo: number | undefined,
  fechaInicial: string,
  fechaFinal: string,
  estatus: number
): Promise<TypeParticipacionFecha[] | null> => {
  if (
    idUsuario === undefined ||
    idGrado === undefined ||
    idMateria === undefined ||
    idGrupo === undefined
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
