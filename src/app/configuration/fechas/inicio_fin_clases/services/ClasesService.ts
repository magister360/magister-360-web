import axios from "axios";
import { getApiUrl } from "../../../../../../API";
import { InicioFinClases } from "@/app/types/inicio_fin_clases/TypeInicioFinClases";

export const createFechaInicioFinClasesApi = async (
  fechaInicial: Date | null,
  fechaFinal: Date | null,

  idUsuario: number | undefined
): Promise<boolean> => {
  const apiUrl = getApiUrl("/api/clases/create");

  const response = await axios
    .post(
      apiUrl,
      {
        fechaInicial,
        fechaFinal,

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
      console.log(error);
      return false;
    });
  return response;
};

export const updateFechaInicioFinClasesApi = async (
  id: number,
  fechaInicial: Date | null,
  fechaFinal: Date | null
): Promise<boolean> => {
  const apiUrl = getApiUrl("/api/clases/update");

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
      console.log(error);
      return false;
    });
  return response;
};

export const getFechaInicioFinClasesApi = async (
  idUsuario: number | undefined
): Promise<InicioFinClases | null> => {
  const apiUrl = getApiUrl("/api/clases/get_clases");

  try {
    const response = await axios.get(apiUrl, {
      params: { idUsuario },
    });

    return response.data;
  } catch (error) {
    console.log(error)
    return null;
  }
};
