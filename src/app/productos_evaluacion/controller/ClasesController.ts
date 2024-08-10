import { InicioFinClases } from "@/app/types/inicio_fin_clases/TypeInicioFinClases";
import { getFechaInicioFinClasesApi } from "../services/ClasesService";

export const getFechaInicioFinClases = async (
    idUsuario: number | undefined
  ): Promise<InicioFinClases | null> => {
    if (idUsuario === undefined) return null;
  
    return await getFechaInicioFinClasesApi(idUsuario);
  };
  