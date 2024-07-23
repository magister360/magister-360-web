import { StudentExamen } from "@/app/types/types";
import { getApiUrl } from "../../../../../../API";
import axios from "axios";

export const createExamenApi = async (
  id: string,
  noPeriodo: string,
  calificacion: number,
  contenido: string,
  idAlumno: string,
  idUsuario: number,
  idMateria: number,
  estatus: number
) => {
  const apiUrl = getApiUrl("/api/examen");

  const response = await axios
    .post(
      apiUrl,
      {
        id,
        noPeriodo,
        calificacion,
        contenido,
        idAlumno,
        idUsuario,
        idMateria,
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

export const updateExamenApi = async (id: string, calificacion: number) => {
  const apiUrl = getApiUrl("/api/examen");

  const response = await axios
    .put(
      apiUrl,
      {
        id,
        calificacion,
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

export const getExamenesApi = async (
  idUsuario: number,
  idMateria: number,
  codigoBarras: string,
  fecha: string,
  estatus: number
): Promise<StudentExamen | null> => {
  const apiUrl = getApiUrl("/api/examen");

  const response = await axios
    .get(apiUrl, {
      params: {
        idUsuario,
        idMateria,
        codigoBarras,
        fecha,
        estatus,
      },
    })
    .then((r) => {
      if (r.status === 200) {
        return r.data as StudentExamen;
      } else {
        return null;
      }
    })
    .catch((e) => {
      return null;
    });
  return response;
};
