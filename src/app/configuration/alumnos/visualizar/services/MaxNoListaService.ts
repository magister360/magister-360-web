import { getApiUrl } from "../../../../../../API";
import axios from "axios";

export const getMaxNoListaAlumnoApi = async (
  idUsuario: number,
  estatus: number,
  idGrado: number,
  idGrupo: number
) => {
  const apiUrl = getApiUrl("/api/maxNoListaAlumno");

  const response = await axios
    .get(apiUrl, {
      params: {
        idUsuario: idUsuario,
        estatus: estatus,
        idGrado: idGrado,
        idGrupo: idGrupo,
      },
    })
    .then((response) => {
      if (response.status === 200 && response.data.maxNoLista !== undefined) {
        return response.data.maxNoLista + 1;
      } else {
        return -1;
      }
    })
    .catch((error) => {
      return -1;
    });
  return response;
};
