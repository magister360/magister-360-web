import { InicioFinClases } from "@/app/types/inicio_fin_clases/TypeInicioFinClases";
import { getApiUrl } from "../../../../../API";
import axios from "axios";

export const getFechaInicioFinClasesApi = async (
    idUsuario: number | undefined
  ): Promise<InicioFinClases | null> => {
    const apiUrl = getApiUrl("/api/clases/get_clases");
  
    try {
      const response = await axios.get(apiUrl, {
        params: { idUsuario },
      });
  
      return response.data;
    } catch (error) {
     // console.log(error)
      return null;
    }
  };