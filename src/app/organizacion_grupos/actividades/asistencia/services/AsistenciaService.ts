import { AsistenciaFecha } from "@/app/types/asistencia/TypeAsistencia";
import { getApiUrl } from "../../../../../../API";
import axios from "axios";

export const createAsistenciaApi = async (
  id: string,
  fecha: string,
  fechaRegistro: Date,
  asistencia: number,

  idAlumno: string,
  idUsuario: number,
  idMateria: number
) => {
  if (fecha === "") {
    return false;
  }
  const apiUrl = getApiUrl("/api/asistencia");

  const response = await axios
    .post(
      apiUrl,
      {
        id,
        fecha,
        fechaRegistro,
        asistencia,
        idAlumno,
        idUsuario,
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

export const createAsistenciasApi = async (asistencias: AsistenciaFecha[]) => {
  const apiUrl = getApiUrl("/api/asistencia/create");
  const response = await axios
    .post(apiUrl, {
      asistencias,
    })
    .then((response) => {
      return response.status === 200;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

export const countFechasAsistenciasApi = async (
  fecha: string,
  idMateria: number,
  estatus: number,
  idGrado: number,
  idGrupo: number
) => {
  const apiUrl = getApiUrl("/api/asistencia/count_fechas");
  const response = await axios
    .get(apiUrl, {
      params: {
        fecha,
        idMateria,
        estatus,
        idGrado,
        idGrupo,
      },
    })
    .then((response) => {
     
      if (response.status === 200 && response.data.count !== 0) {
      
        return true;
      } else if (response.status === 200 && response.data.count === 0) {
        return false;
      }
    })
    .catch((error) => {
      return true;
    });
  return response;
};
