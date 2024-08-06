import axios from "axios";
import { getApiUrl } from "../../../../../API";
import { Cronograma } from "@/app/types/cronograma/TypeCronograma";

export const createCronogramaApi = async (
  id: string,

  contenido: string,
  mes: string,
  idUsuario: number | undefined,
  idMateria: number | undefined,
  idGrado: number | undefined,
  idGrupo: number | undefined,
  estatus: number
) => {
  const apiUrl = getApiUrl("/api/cronograma/create");

  const response = await axios
    .post(
      apiUrl,
      {
        id,

        contenido,
        mes,
        idUsuario,
        idMateria,
        idGrado,
        idGrupo,
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

export const getCronogramasApi = async (
  idUsuario: number | undefined,
  idMateria: number | undefined,
  idGrado: number | undefined,
  idGrupo: number | undefined,
  estatus: number | undefined
): Promise<Cronograma[] | null> => {
  const apiUrl = getApiUrl("/api/cronograma/get_cronograma");

  const response = await axios
    .get(apiUrl, {
      params: {
        idUsuario,
        idMateria,
        idGrado,
        idGrupo,
        estatus,
      },
    })
    .then((r) => {
      if (r.status === 200) {
        return r.data as Cronograma[];
      } else {
        return null;
      }
    })
    .catch((e) => {
      return null;
    });
  return response;
};
