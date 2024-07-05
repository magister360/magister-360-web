import { StudentParticipacion } from "@/app/types/types";
import { getApiUrl } from "../../../../../../API";
import axios from "axios";

export const createParticipacionApi = async (
  id: string,
  fecha: string,
  fechaRegistro: Date,
  calificacion: number,
  contenido: string,
  idAlumno: string,
  idUsuario: number,
  idMateria: number
) => {
  if (fecha === "") {
    return false;
  }
  const apiUrl = getApiUrl("/api/participacion");

  const response = await axios
    .post(
      apiUrl,
      {
        id,
        fecha,
        fechaRegistro,
        calificacion,
        contenido,
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

export const getParticipacionesApi = async (
  idUsuario: number,
  idMateria: number,
  codigoBarras: string,
  fecha: string
): Promise<StudentParticipacion | null> => {
  const apiUrl = getApiUrl("/api/participacion");

  const response = await axios
    .get(apiUrl, {
      params: {
        idUsuario,
        idMateria,
        codigoBarras,
        fecha,
      },
    })
    .then((r) => {
      if (r.status === 200) {
        return r.data as StudentParticipacion;
      } else {
        return null;
      }
    })
    .catch((e) => {
      return null;
    });
  return response;
};
