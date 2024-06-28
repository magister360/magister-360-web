import axios from "axios";
import { getApiUrl } from "../../../../../../API";
import { StudentType, ItemAlumnoMateria } from "@/app/types/types";

export const createAlumnosApi = async (
  alumnos: StudentType[],
  alumnosMateria: ItemAlumnoMateria[]
) => {
  const apiUrl = getApiUrl("/api/alumnos");

  const response = await axios
    .post(
      apiUrl,
      {
        alumnos,
        alumnosMateria,
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
      console.error(error);
      return false;
    });
  return response;
};

export const countsAlumnosApi = async (
  idUsuario: number,
  estatus: number,
  idGrado: number,
  idGrupo: number
) => {
  const apiUrl = getApiUrl("/api/countAlumnos");

  const response = await axios
    .get(apiUrl, {
      params: {
        idUsuario,
        estatus,
        idGrado,
        idGrupo,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        if (response.data === 0) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    })
    .catch((error) => {
      return false;
    });
  return response;
};
