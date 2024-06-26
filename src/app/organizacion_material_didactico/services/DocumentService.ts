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

export const updateMaterialDidacticoApi = async (
  id: string,
  tipo: string,
  url: string,
  titulo: string,
  descripcion: string,
  miniatura: string,
  file: string
): Promise<boolean>  => {
  const apiUrl = getApiUrl("/api/update_material_didactico");

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

export const deleteMaterialDidacticoApi = async (
  id: string
): Promise<boolean> => {
  const apiUrl = getApiUrl("/api/delete_material_didactico");

  try {
    const response = await axios.delete(apiUrl, {
      data: { id },
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};
