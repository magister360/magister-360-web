import axios from "axios";
import { getApiUrl } from "../../../../../API";
import { Student } from "@/app/types/alumnos/TypeStudents";

export const getAlumnosApi = async (
    idUsuario: number,
    estatus: number,
    idGrado: number,
    idGrupo: number,
    idMateria: number
  ):Promise<Student[]|null> => {
    const apiUrl = getApiUrl("/api/alumnos/get_alumnos");
  
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