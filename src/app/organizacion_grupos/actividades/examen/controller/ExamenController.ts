import { convertDateToISO } from "@/app/utils/DateUtils";
import {
  createExamenApi,
  getExamenesApi,
  updateExamenApi,
} from "../services/ExamenSrervice";
import { StudentExamen } from "@/app/types/types";

export const createExamen = async (
  id: string,
  noPeriodo: string | undefined,
  calificacion: number,
  contenido: string,
  idAlumno: string | undefined,
  idUsuario: number | undefined,
  idMateria: number | undefined,
  estatus: number
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
    estatus === undefined ||
    noPeriodo === undefined ||
    noPeriodo === null
  ) {
    return { isSave: false, message: "No fue posible guardar los datos." };
  }

  return await createExamenApi(
    id,
    noPeriodo,
    calificacion,
    contenido,
    idAlumno,
    idUsuario,
    idMateria,
    estatus
  )
    .then((response) => {
      if (response) {
        return {
          isSave: true,
          message: "El examen se guardó con éxito",
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

export const updateExamen = async (
  id: string,
  calificacion: number
): Promise<{ isSave: boolean; message: string }> => {
  if (id === undefined) {
    return { isSave: false, message: "No fue posible guardar los datos." };
  }
  if (calificacion === undefined || calificacion < 5 || calificacion > 10) {
    return { isSave: false, message: "La calificación es inválida." };
  }

  return await updateExamenApi(id, calificacion)
    .then((response) => {
      if (response) {
        return {
          isSave: true,
          message: "El examen se modifico con éxito",
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
      return { isSave: false, message: "No fue posible modificar los datos." };
    });
};

export const getExamen = async (
  idUsuario: number,
  idMateria: number | undefined,
  codigoBarras: string,
  fecha: string | null,
  estatus: number
): Promise<StudentExamen | null> => {
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

  return await getExamenesApi(
    idUsuario,
    idMateria,
    codigoBarras,
    fechaISO,
    estatus
  );
};
