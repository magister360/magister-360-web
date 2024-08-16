import axios from "axios";
import { getApiUrl } from "../../../API";
import { Student } from "../types/alumnos/TypeStudents";

export const getAlumnosApi = async (
    idUsuario: number,
    estatus: number,
    idGrado: number,
    idGrupo: number,
    busqueda: string,
    idMateria: number
  ): Promise<Student[]>  => {
    const apiUrl = getApiUrl("/api/alumno/get_alumnos");
  
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