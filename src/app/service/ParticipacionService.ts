import axios from "axios";
import { getApiUrl } from "../../../API";

export const getParticipacionFechasApi = async (
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idUsuario: number,
  idMateria: number,
  fechaInicial: Date | null,
  fechaFinal: Date | null,
  estatus: number
): Promise<string[] > => {
  const apiUrl = getApiUrl("/api/participacion/get_fechas_periodo");

  const response = await axios
    .get(apiUrl, {
      params: {
        idGrado,
        idGrupo,
        idUsuario,
        idMateria,
        fechaInicial,
        fechaFinal,
        estatus,
      },
    })
    .then((r) => {
      if (r.status === 200) {
        return r.data;
      } else {
        return [];
      }
    })
    .catch((e) => {
      return null;
    });
  return response;
};
