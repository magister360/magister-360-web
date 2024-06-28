import { getApiUrl } from "../../../../API";
import axios from "axios";
import apiSpringBoot from "../../../../APISpringBoot";

export const searchMaterialTituloApi = async (
  idGrado: number,
  idGrupo: number,
  idMateria: number,
  limit: number,
  titulo: string
) => {
  const apiUrl = getApiUrl("/api/material_didactico_titulo");

  const response = await axios
    .get(apiUrl, {
      params: {
        idGrado,
        idGrupo,
        idMateria,
        limit,
        titulo,
      },
    })
    .then((response) => {
      return response.status === 200 ? response.data : null;
    })
    .catch((error) => {
      return null;
    });
  return response;
};

export const searchMaterialTituloEquipoApi = async (
  grado: string,
  grupo: string,
  materia: string,
  mes: string,
  tipo: string,
  txtSearch: string
) => {
  console.log("grado " + grado);
  console.log("grupo " + grupo);
  console.log("materia " + materia);
  console.log("mes " + mes);
  console.log("tipo " + tipo);
  console.log("txtSearch " + txtSearch);
  const endpoint = "files_content";

  const response = await apiSpringBoot
    .get(endpoint, {
      params: {
        grado,
        grupo,
        materia,
        mes,
        tipo,
        txtSearch,
      },
    })
    .then((response) => {
      console.log("response.status " + response.status);
      console.log("response.data  " + response.data);
      return response.status === 200 ? response.data : null;
    })
    .catch((error) => {
      console.log("Error completo:", error);
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.log("Datos de respuesta:", error.response.data);
        console.log("Estado de respuesta:", error.response.status);
        console.log("Cabeceras de respuesta:", error.response.headers);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.log("Solicitud:", error.request);
      } else {
        // Algo sucedió en la configuración de la solicitud que desencadenó un error
        console.log("Mensaje de error:", error.message);
      }
      console.log("Configuración de Axios:", error.config);
      return null;
    });
  return response;
};
