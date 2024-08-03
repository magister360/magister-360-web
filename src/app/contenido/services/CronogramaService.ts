import { Cronograma } from "@/app/types/cronograma/TypeCronograma";
import { getApiUrl } from "../../../../API";
import axios from "axios";

export const getCronogramaApi = async (
  idUsuario: number,
  idGrado: number,
  idGrupo: number,
  idMateria: number
): Promise<Cronograma[] | null> => {
  const apiUrl = getApiUrl("/api/cronograma/get_cronograma");

  try {
    const response = await axios.get(apiUrl, {
      params: { idUsuario, idGrado, idGrupo, idMateria },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
