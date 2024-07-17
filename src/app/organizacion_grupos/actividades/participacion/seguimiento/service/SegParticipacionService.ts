import axios from "axios";
import { getApiUrl } from "../../../../../../../API";

export const getFechasParticipacionApi = async (
  idUsuario: number,
  idMateria: number,
  fechaInicial: Date | null,
  fechaFinal: Date | null
) => {
  const apiUrl = getApiUrl("/api/fechas_participacion");

  const response = await axios
    .get(apiUrl, {
      params: {
        idUsuario,
        idMateria,
        fechaInicial,
        fechaFinal
      },
    })
    .then((r) => {
      if (r.status === 200) {
        console.log(r.data);
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

export const getFechasParticipacionAlumnoApi = async (
  idMateria: number,
  idUsuario: number,
  idAlumno: string
) => {
  const apiUrl = getApiUrl("/api/fecha_participacion_alumno");

  const response = await axios
    .get(apiUrl, {
      params: {
        idUsuario,
        idMateria,
        idAlumno,
      },
    })
    .then((r) => {
      if (r.status === 200) {
        console.log(r.data);
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

export const getAlumnosParticipacionApi = async (
  idUsuario: number,
  estatus: number,
  idGrado: number,
  idGrupo: number,
  busqueda: string,
  idMateria: number
) => {
  const apiUrl = getApiUrl("/api/alumno_participacion");

  const response = await axios
    .get(apiUrl, {
      params: {
        idUsuario,
        estatus,
        idGrado,
        idGrupo,
        busqueda,
        idMateria,
      },
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
