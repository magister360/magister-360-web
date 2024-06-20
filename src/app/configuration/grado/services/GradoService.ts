import { getApiUrl } from "../../../../../API";
import axios from "axios";

export const createGradoApi = async (
  grado: string,
  estatus: number,
  idUsuario: number
) => {
  const apiUrl = getApiUrl("/api/grado");

  const response = await axios
    .post(
      apiUrl,
      {
        grado,
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

export const removeGradoApi = async (id: number, estatus: number) => {
  const apiUrl = getApiUrl("/api/removeGrado");
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

export const updateGradoApi = async (id: number, grado: string) => {
  const apiUrl = getApiUrl("/api/updateGrado");
  const response = await axios
    .post(
      apiUrl,
      {
        id,
        grado,
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

export const getGradosApi = async (idUsuario: number, estatus: number) => {
  const apiUrl = getApiUrl("/api/grado");

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
