import axios from "axios";
import { getApiUrl } from "../../../../../../../API";

export const getFechasPeriodosApi = async (idUsuario: number,estatus:number) => {
    const apiUrl = getApiUrl("/api/periodos_evaluacion");
  
    return await axios
      .get(apiUrl, {
        params: { idUsuario,estatus },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        return null;
      })
      .catch((error) => {
        throw new Error("Error al obtener los periodos de evaluación");
      });
  };