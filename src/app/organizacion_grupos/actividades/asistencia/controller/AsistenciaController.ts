import { convertDateToISO } from "@/app/utils/DateUtils";
import { createAsistenciaApi } from "../services/AsistenciaService";



export const createAsistencia = async (
  id: string,
  fecha: string | null,
  asistencia: number,

  idAlumno: string,
  idUsuario: number,
  idMateria: number|undefined
): Promise<{ isSave: boolean; message: string }> => {
  if (
    idAlumno === undefined ||
    idAlumno.length === 0 ||
    idMateria === undefined ||
    idMateria <= 0 ||
    asistencia === undefined ||
    idUsuario === undefined ||
    idUsuario <= 0 ||
    fecha === null
  ) {
    console.log(idAlumno)
    return { isSave: false, message: "No fue posible guardar los datos." };
  }

  const fechaRegistro: Date = new Date();
  const fechaISO = convertDateToISO(fecha);

  return await createAsistenciaApi(
    id,
    fechaISO,
    fechaRegistro,
    asistencia,
    idAlumno,
    idUsuario,
    idMateria
  )
    .then((response) => {
      if (response) {
        return {
          isSave: true,
          message: "La participación se guardó con éxito",
        };
      } else {
        return {
          isSave: false,
          message:
            "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.",
        };
      }
    })
    .catch((error) => {
      return { isSave: false, message: "No fue posible guardar los datos." };
    });
};
