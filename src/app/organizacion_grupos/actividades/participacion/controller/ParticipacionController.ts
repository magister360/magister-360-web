import { convertDateToISO } from "@/app/utils/DateUtils";
import {
  createParticipacionApi,
  getParticipacionesApi,
} from "../services/ParticipacionService";
import { StudentParticipacion } from "@/app/types/types";

export const createParticipacion = async (
  id: string,
  fecha: string | null,
  calificacion: number,
  contenido: string,
  idAlumno: string,
  idUsuario: number,
  idMateria: number|undefined
): Promise<{ isSave: boolean; message: string }> => {
  if (
    idAlumno === undefined ||
    idAlumno.length === 0 ||
    idMateria === undefined ||
    idMateria <= 0 ||
    calificacion === undefined ||
    calificacion < 5 ||
    calificacion > 10 ||
    idUsuario === undefined ||
    idUsuario <= 0 ||
    fecha === null
  ) {
    console.log(idAlumno)
    return { isSave: false, message: "No fue posible guardar los datos." };
  }

  const fechaRegistro: Date = new Date();
  const fechaISO = convertDateToISO(fecha);

  return await createParticipacionApi(
    id,
    fechaISO,
    fechaRegistro,
    calificacion,
    contenido,
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

export const getParticipacion = async (
  idUsuario: number,
  idMateria: number|undefined,
  codigoBarras: string,
  fecha: string| null
): Promise<StudentParticipacion | null> => {
  if (
    codigoBarras === undefined ||
    codigoBarras.length === 0 ||
    idMateria === undefined ||
    idMateria <= 0 ||
    idUsuario === undefined ||
    idUsuario <= 0 ||
    fecha === null
  ) {
    return null;
  }
  const fechaISO = convertDateToISO(fecha);

  return await getParticipacionesApi(idUsuario, idMateria, codigoBarras, fechaISO);
};
