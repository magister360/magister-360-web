
import { StudentProyecto } from "@/app/types/proyecto/TypeProyecto";
import { getApiUrl } from "../../../../../../API";
import axios from "axios";

export const createProyectoApi = async (
  id: string,
  fecha: string,
  fechaRegistro: Date,
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
  const apiUrl = getApiUrl("/api/proyecto");

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

export const getProyectosApi = async (
  idUsuario: number,
  idMateria: number,
  codigoBarras: string,
  fecha: string,
  estatus:  number
): Promise<StudentProyecto | null> => {
  const apiUrl = getApiUrl("/api/proyecto");

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
        return r.data as StudentProyecto;
      } else {
        console.log(r.status)
        return null;
      }
    })
    .catch((e) => {
  
      return null;
    });
  return response;
};
