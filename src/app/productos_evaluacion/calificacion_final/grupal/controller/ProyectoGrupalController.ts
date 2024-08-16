import { TypeProyectoCalificacion } from "@/app/types/proyecto/TypeProyecto";
import { countProyectosGrupalApi, getProyectosGrupalApi } from "../services/ProyectoGrupalService";

export const getProyectosGrupal = async (
    idUsuario: number | undefined,
    idMateria: number | undefined,
    idGrado: number | undefined,
    idGrupo: number | undefined,
    fechaInicial: string[]|undefined,
    fechaFinal: string[]|undefined,
    estatus: number
  ): Promise<TypeProyectoCalificacion[] | null> => {
  
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
  
    return await getProyectosGrupalApi(
      idUsuario,
      idMateria,
      idGrado,
      idGrupo,
      fechaInicial,
      fechaFinal,
      estatus
    );
  };
  
  export const countProyectosGrupal = async (
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
  
    return await countProyectosGrupalApi(
      idUsuario,
      idMateria,
      idGrado,
      idGrupo,
      fechaInicial,
      fechaFinal,
      estatus
    );
  };