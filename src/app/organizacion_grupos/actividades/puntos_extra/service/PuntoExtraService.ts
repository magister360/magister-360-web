
import { StudentPuntoExtra } from "@/app/types/puntos_extra/TypePuntoExtra";
import { getApiUrl } from "../../../../../../API";
import axios from "axios";

export const createPuntoExtrApi = async (
  id: string,
  fecha: string,
  calificacion: number,
  contenido: string,
  idAlumno: string,
  idUsuario: number,
  idMateria: number,
  estatus:number
) => {
  if (fecha === "") {
    return false;
  }
  const apiUrl = getApiUrl("/api/punto_extra");

  const response = await axios
    .post(
      apiUrl,
      {
        id,
        fecha,
        calificacion,
        contenido,
        idAlumno,
        idUsuario,
        idMateria,
        estatus
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

export const getPuntoExtraApi = async (
  idUsuario: number,
  idMateria: number,
  codigoBarras: string,
  fecha: string,
  estatus:number
): Promise<StudentPuntoExtra | null> => {
  const apiUrl = getApiUrl("/api/punto_extra");

  const response = await axios
    .get(apiUrl, {
      params: {
        idUsuario,
        idMateria,
        codigoBarras,
        fecha,
        estatus
      },
    })
    .then((r) => {
      if (r.status === 200) {
       
        return r.data as StudentPuntoExtra;
      } else {
        return null;
      }
    })
    .catch((e) => {
      return null;
    });
  return response;
};
