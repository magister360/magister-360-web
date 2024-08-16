import { TypeTareaCalificacion } from "@/app/types/tarea/TypeTarea";
import { countTareasGrupalApi, getTareasGrupalApi } from "../services/TareaGrupalservice";

export const getTareasGrupal = async (
    idUsuario: number | undefined,
    idMateria: number | undefined,
    idGrado: number | undefined,
    idGrupo: number | undefined,
    fechaInicial: string[]|undefined,
    fechaFinal: string[]|undefined,
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
  
    return await getTareasGrupalApi(
      idUsuario,
      idMateria,
      idGrado,
      idGrupo,
      fechaInicial,
      fechaFinal,
      estatus
    );
  };
  
  export const countTareasGrupal = async (
    idUsuario: number | undefined,
    idMateria: number | undefined,
    idGrado: number | undefined,
    idGrupo: number | undefined,
    fechaInicial: string[]|undefined,
    fechaFinal: string[]|undefined,
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
  
    return await countTareasGrupalApi(
      idUsuario,
      idMateria,
      idGrado,
      idGrupo,
      fechaInicial,
      fechaFinal,
      estatus
    );
  };