import { getApiUrl } from "../../../../API";
import axios from "axios";

export const createMaterialDidacticoApi = async (
  id: string,
  tipo: string,
  url: string,
  titulo: string,
  descripcion: string,
  miniatura: string,
  file: string,
  idGrado: number,
  idGrupo: number,
  idMateria: number
) => {
  const apiUrl = getApiUrl("/api/material_didactico");

  const response = await axios
    .post(
      apiUrl,
      {
        id,
        tipo,
        url,
        titulo,
        descripcion,
        miniatura,
        file,
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
