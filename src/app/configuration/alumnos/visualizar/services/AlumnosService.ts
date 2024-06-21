import { getApiUrl } from "../../../../../../API";
import axios from "axios";

export const getAlumnosApi = async (
  idUsuario: number,
  estatusAlta: number,
  estatusBaja: number,
  estatusCambio: number,
  idGrado: number,
  idGrupo: number
) => {
  const apiUrl = getApiUrl("/api/alumnos");

  const response = await axios
    .get(apiUrl, {
      params: {
        idUsuario: idUsuario,
        estatusAlta: estatusAlta,
        estatusBaja: estatusBaja,
        estatusCambio: estatusCambio,
        idGrado: idGrado,
        idGrupo: idGrupo,
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
