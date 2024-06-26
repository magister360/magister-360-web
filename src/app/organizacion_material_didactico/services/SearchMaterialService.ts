import { getApiUrl } from "../../../../API";
import axios from "axios";

export const searchMaterialApi = async (
  idGrado: number,
  idGrupo: number,
  idMateria: number,
  limit: number
) => {
  const apiUrl = getApiUrl("/api/material_didacticos");

  const response = await axios
    .get(apiUrl, {
      params: {
        idGrado,
        idGrupo,
        idMateria,
        limit,
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
