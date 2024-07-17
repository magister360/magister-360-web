
import axios from "axios";
import { getApiUrl } from "../../../../../../API";

export const createFechasPeriodosApi = async (
  id: string,
  noPeriodo: number,
  fechaInicial: Date | null,
  fechaFinal: Date | null,
  actividad: string,
  estatus: number,
  idUsuario: number
): Promise<boolean> => {
  const apiUrl = getApiUrl("/api/periodos_evaluacion");

  const response = await axios
    .post(
      apiUrl,
      {
        id,
        noPeriodo,
        fechaInicial,
        fechaFinal,
        actividad,
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

export const updateFechasPeriodosApi = async (
  id: string,
  fechaInicial: Date | null,
  fechaFinal: Date | null,
  
): Promise<boolean> => {
  const apiUrl = getApiUrl("/api/periodos_evaluacion");

  const response = await axios
    .put(
      apiUrl,
      {
        id,
        fechaInicial,
        fechaFinal,
   
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


export const getFechasPeriodosApi = async (idUsuario: number,estatus:number) => {
  const apiUrl = getApiUrl("/api/periodos_evaluacion");

  return await axios
    .get(apiUrl, {
      params: { idUsuario,estatus },
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
      return null;
    })
    .catch((error) => {
      throw new Error("Error al obtener los periodos de evaluación");
    });
};

export const deleteFechasPeriodosApi = async (
  id: string,
  estatus:number
  
): Promise<boolean> => {
  const apiUrl = getApiUrl("/api/remove_periodos_evaluacion");


  const response = await axios
    .put(
      apiUrl,
      {
        id,
        estatus
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

