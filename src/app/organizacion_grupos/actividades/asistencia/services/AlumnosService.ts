import axios from "axios";
import { getApiUrl } from "../../../../../../API";

export const getAlumnosApi = async (
  idUsuario: number,
  estatus: number,
  idGrado: number,
  idGrupo: number,
  idMateria: number,
  orderStudents: string
) => {
  const apiUrl = getApiUrl("/api/alumno_asistencia");

  const response = await axios
    .get(apiUrl, {
      params: {
        idUsuario: idUsuario,
        estatus: estatus,
        idGrado: idGrado,
        idGrupo: idGrupo,
        idMateria: idMateria,
        orderStudents: orderStudents,
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
