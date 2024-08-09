import { TypeProyectoCalificacion, TypeProyectoFecha } from "@/app/types/proyecto/TypeProyecto";
import { countProyectosApi, getProyectosApi } from "../services/ProyectoService";

export const getProyectos = async (
    idUsuario: number | undefined,
    idMateria: number | undefined,
    idGrado: number | undefined,
    idGrupo: number | undefined,
    fechaInicial: string|undefined,
    fechaFinal: string|undefined,
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
  
    return await getProyectosApi(
      idUsuario,
      idMateria,
      idGrado,
      idGrupo,
      fechaInicial,
      fechaFinal,
      estatus
    );
  };
  
  export const countProyectos = async (
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
  
    return await countProyectosApi(
      idUsuario,
      idMateria,
      idGrado,
      idGrupo,
      fechaInicial,
      fechaFinal,
      estatus
    );
  };