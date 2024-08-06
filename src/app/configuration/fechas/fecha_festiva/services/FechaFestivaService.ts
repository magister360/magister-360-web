import axios from "axios";
import { getApiUrl } from "../../../../../../API";
import { FechaFestiva } from "@/app/types/fecha_festiva/TypeFechaFestiva";

export const createFechaFestivaApi = async (
  fecha: string,
  actividad: string,

  idUsuario: number,
  estatus: number
): Promise<boolean> => {
  const apiUrl = getApiUrl("/api/fecha_festiva/create");

  const response = await axios
    .post(
      apiUrl,
      {
        fecha,
        actividad,

        idUsuario,
        estatus,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return response.status === 200;
    })
    .catch((error) => {
      return false;
    });
  return response;
};

export const getFechasFestivasApi = async (
  idUsuario: number,
  estatus: number
): Promise<FechaFestiva[] | null> => {
  const apiUrl = getApiUrl("/api/fecha_festiva/get_fechas_festivas");

  const response = await axios
    .get<FechaFestiva[]>(apiUrl, {
      params: { idUsuario, estatus },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
  return response;
};
