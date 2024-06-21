import { getApiUrl } from "../../../../../API";
import axios from "axios";

export const createMateriaApi = async (
  materia: string,
  estatus: number,
  idUsuario: number
) => {
  const apiUrl = getApiUrl("/api/materia");

  const response = await axios
    .post(
      apiUrl,
      {
        materia,
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

export const removeMateriaApi = async (id: number, estatus: number) => {
  const apiUrl = getApiUrl("/api/removeMateria");
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

export const updateMateriaApi = async (id: number, materia: string) => {
  const apiUrl = getApiUrl("/api/updateMateria");
  const response = await axios
    .post(
      apiUrl,
      {
        id,
        materia,
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

export const getMateriasApi = async (idUsuario: number, estatus: number) => {
  const apiUrl = getApiUrl("/api/materia");

  const response = await axios
    .get(apiUrl, {
      params: {
        idUsuario,
        estatus,
      },
    })
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      return null;
    });
  return response;
};
