import { getApiUrl } from "../../../../../API";
import axios from "axios";

export const createEncuadreCalificacionApi = async (
  id: string,
  json: string,
  puntosExtra: string,
  estatus: number,
  idUsuario: number,
  idGrado: number,
  idGrupo: number,
  idMateria: number
): Promise<boolean> => {
  const apiUrl = getApiUrl("/api/encuadre_calificacion");

  const response = await axios
    .post(
      apiUrl,
      {
        id,
        json,
        puntosExtra,
        estatus,
        idUsuario,
        idGrado,
        idGrupo,
        idMateria,
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

export const putEncuadreCalificacionApi = async (
  id: string,
  json: string,
  puntosExtra: string
): Promise<boolean> => {
  const apiUrl = getApiUrl("/api/encuadre_calificacion");

  const response = await axios
    .put(
      apiUrl,
      {
        id,
        json,
        puntosExtra,
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
