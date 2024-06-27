import { getApiUrl } from "../../../../API";
import axios from "axios";

export const searchMaterialTituloApi = async (
    idGrado: number,
    idGrupo: number,
    idMateria: number,
    limit: number,
    titulo:string
  ) => {
    
    const apiUrl = getApiUrl("/api/material_didactico_titulo");
  
    const response = await axios
      .get(apiUrl, {
        params: {
          idGrado,
          idGrupo,
          idMateria,
          limit,
          titulo
        },
      })
      .then((response) => {
  
        return response.status === 200 ? response.data : null;
      })
      .catch((error) => {
        return null;
      });
    return response;
  };