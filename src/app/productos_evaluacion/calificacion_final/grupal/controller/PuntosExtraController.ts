import { TypePuntoExtraCalificacion } from "@/app/types/puntos_extra/TypePuntoExtra";
import { getPuntosExtraGrupalApi } from "../services/PuntosExtraService";

export const getPuntoExtraGrupal = async (
    idUsuario: number | undefined,
    idMateria: number | undefined,
    idGrado: number | undefined,
    idGrupo: number | undefined,
    fechaInicial: string[]|undefined,
    fechaFinal: string[]|undefined,
    estatus: number
  ): Promise<TypePuntoExtraCalificacion[] | null> => {
  
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
  
    return await getPuntosExtraGrupalApi(
      idUsuario,
      idMateria,
      idGrado,
      idGrupo,
      fechaInicial,
      fechaFinal,
      estatus
    );
  };
  