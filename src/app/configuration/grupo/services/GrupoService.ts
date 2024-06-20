import { getApiUrl } from "../../../../../API";
import axios from "axios";

export const createGrupoApi = async (
  grupo: string,
  estatus: number,
  idUsuario: number
) => {
  const apiUrl = getApiUrl("/api/grupo");

  const response = await axios
    .post(
      apiUrl,
      {
        grupo,
        estatus,
        idUsuario,
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

export const removeGrupoApi = async (id: number, estatus: number) => {
  const apiUrl = getApiUrl("/api/removeGrupo");
  const response = await axios
    .post(
      apiUrl,
      {
        id,
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

export const updateGrupoApi = async (id: number, grupo: string) => {
  const apiUrl = getApiUrl("/api/updateGrupo");
  const response = await axios
    .post(
      apiUrl,
      {
        id,
        grupo,
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

export const getGruposApi = async (idUsuario: number, estatus: number) => {
  const apiUrl = getApiUrl("/api/grupo");

  const response = await axios
    .get(apiUrl, {
      params: {
        idUsuario,
        estatus,
      },
    })
    .then((r) => {
      // console.log("Respuesta de data "+r.data)
      return r.data;
    })
    .catch((e) => {
      return null;
    });
  return response;
};
