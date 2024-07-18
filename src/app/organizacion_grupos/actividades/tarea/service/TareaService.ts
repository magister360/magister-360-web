
import { StudentTarea } from "@/app/types/tarea/TypeTarea";
import { getApiUrl } from "../../../../../../API";
import axios from "axios";

export const createTareaApi = async (
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
  const apiUrl = getApiUrl("/api/tarea");

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


export const updateTareaApi = async (
  id: string,
  calificacion: number,

) => {

  const apiUrl = getApiUrl("/api/tarea");

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


export const getTareasApi = async (
  idUsuario: number,
  idMateria: number,
  codigoBarras: string,
  fecha: string,
  estatus:number
): Promise<StudentTarea | null> => {
  const apiUrl = getApiUrl("/api/tarea");
 
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
        return r.data as StudentTarea;
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
