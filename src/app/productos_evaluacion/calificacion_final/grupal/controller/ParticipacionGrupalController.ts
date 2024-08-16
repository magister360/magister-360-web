import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";
import { countParticipacionesGrupalApi, getParticipacionesGrupalApi } from "../services/ParticipacionGrupalService";

export const getParticipacionesGrupal = async (
    idUsuario: number | undefined,
    idMateria: number | undefined,
    idGrado: number | undefined,
    idGrupo: number | undefined,
    fechaInicial: string[] | undefined,
    fechaFinal: string[] | undefined,
    estatus: number
  ): Promise<TypeParticipacionCalificacion[] | null> => {
    if (
      idUsuario === undefined ||
      idGrado === undefined ||
      idMateria === undefined ||
      idGrupo === undefined ||
      fechaInicial === undefined ||
      fechaFinal === undefined
    ) {
      return null;
    }
  
    return await getParticipacionesGrupalApi(
      idUsuario,
      idMateria,
      idGrado,
      idGrupo,
      fechaInicial,
      fechaFinal,
      estatus
    );
  };

  export const countParticipacionesGrupal = async (
    idUsuario: number | undefined,
    idMateria: number | undefined,
    idGrado: number | undefined,
    idGrupo: number | undefined,
    fechaInicial: string[] | undefined,
    fechaFinal: string[] | undefined,
    estatus: number
  ): Promise<number> => {
    if (
      idUsuario === undefined ||
      idGrado === undefined ||
      idMateria === undefined ||
      idGrupo === undefined ||
      fechaInicial === undefined ||
      fechaFinal === undefined
    ) {
      return 0;
    }
  
    return await countParticipacionesGrupalApi(
      idUsuario,
      idMateria,
      idGrado,
      idGrupo,
      fechaInicial,
      fechaFinal,
      estatus
    );
  };
  