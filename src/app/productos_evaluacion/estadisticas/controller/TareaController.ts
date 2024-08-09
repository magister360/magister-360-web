import { TypeTareaCalificacion, TypeTareaFecha } from "@/app/types/tarea/TypeTarea";
import { countTareasApi, getTareasApi } from "../services/TareaService";

export const getTareas = async (
    idUsuario: number | undefined,
    idMateria: number | undefined,
    idGrado: number | undefined,
    idGrupo: number | undefined,
    fechaInicial: string|undefined,
    fechaFinal: string|undefined,
    estatus: number
  ): Promise<TypeTareaCalificacion[] | null> => {
  
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
  
    return await getTareasApi(
      idUsuario,
      idMateria,
      idGrado,
      idGrupo,
      fechaInicial,
      fechaFinal,
      estatus
    );
  };
  
  export const countTareas = async (
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
  
    return await countTareasApi(
      idUsuario,
      idMateria,
      idGrado,
      idGrupo,
      fechaInicial,
      fechaFinal,
      estatus
    );
  };