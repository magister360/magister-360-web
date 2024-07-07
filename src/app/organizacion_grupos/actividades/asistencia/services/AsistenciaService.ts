import { StudentParticipacion } from "@/app/types/types";
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
