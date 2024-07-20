import axios from "axios";
import { getApiUrl } from "../../../../../../../API";

export const getAlumnosManualApi = async (
  idUsuario: number,
  estatus: number,
  idGrado: number,
  idGrupo: number,
  idMateria: number
) => {
  const apiUrl = getApiUrl("/api/alumno_proyecto_manual");

  const response = await axios
    .get(apiUrl, {
      params: {
        idUsuario: idUsuario,
        estatus: estatus,
        idGrado: idGrado,
        idGrupo: idGrupo,
        idMateria: idMateria,
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

export const getProyectosCalApi = async (
  idUsuario: number,
  estatus: number,
  idGrado: number,
  idGrupo: number,
  idMateria: number,
  fecha:Date
) => {
  const apiUrl = getApiUrl("/api/proyectos_cal");

  const response = await axios
    .get(apiUrl, {
      params: {
        idUsuario: idUsuario,
        estatus: estatus,
        idGrado: idGrado,
        idGrupo: idGrupo,
        idMateria: idMateria,
        fecha:fecha
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

export const updateEstatusProyectoApi = async (
  id: string,
  estatus: number
) => {
  const apiUrl = getApiUrl("/api/proyecto");

  const response = await axios
    .patch(apiUrl, {
      id: id,
      estatus: estatus,
    })
    .then((r) => {
      if (r.status === 200) {
        return r.data;
      } else {
        return null;
      }
    })
    .catch((e) => {
      return null;
    });

  return response;
};

