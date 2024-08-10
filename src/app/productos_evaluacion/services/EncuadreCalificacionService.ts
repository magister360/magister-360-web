import axios from "axios";
import { getApiUrl } from "../../../../API";

export const getEncuadreCalificacionApi = async (
    idGrado: number,
    idGrupo: number,
    idMateria: number,
    idUsuario: number
  ): Promise<any> => {
    const apiUrl = getApiUrl("/api/encuadre_calificacion");
  
    return axios
      .get(apiUrl, {
        params: {
          idGrado,
          idGrupo,
          idMateria,
          idUsuario,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          return null;
        }
      })
      .catch((error) => {
        return null;
      });
  };