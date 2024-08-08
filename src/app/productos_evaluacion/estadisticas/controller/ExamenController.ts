import { TypeExamenPeriodo } from "@/app/types/examen/TypeExamen";
import { getExamenesApi } from "../services/ExamenService";

export const getExamenes = async (
    idUsuario: number | undefined,
    idMateria: number | undefined,
    idGrado: number | undefined,
    idGrupo: number | undefined,
    noPeriodo:number| undefined,
    estatus: number
  ): Promise<TypeExamenPeriodo[] | null> => {
  
    if (
      idUsuario === undefined ||
      idGrado === undefined ||
      idMateria === undefined ||
      idGrupo === undefined||
      noPeriodo === undefined
    ) {
      return null;
    }
  
    return await getExamenesApi(
      idUsuario,
      idMateria,
      idGrado,
      idGrupo,
      noPeriodo,
      estatus
    );
  };