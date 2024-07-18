import { convertDateToISO } from "@/app/utils/DateUtils";
import { createTareaApi, getTareasApi, updateTareaApi } from "../service/TareaService";
import { StudentTarea } from "@/app/types/tarea/TypeTarea";

export const createTarea = async (
  id: string,
  fecha: string | null,
  calificacion: number,
  contenido: string,
  idAlumno: string|undefined,
  idUsuario: number,
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
    fecha === null
  ) {
    return { isSave: false, message: "No fue posible guardar los datos." };
  }

  const fechaISO = convertDateToISO(fecha);

  return await createTareaApi(
    id,
    fechaISO,
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
          message: "La tarea se guardó con éxito",
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

export const updateTarea = async (
  id: string,
  calificacion: number
): Promise<{ isSave: boolean; message: string }> => {
  
  if (id === undefined) {
    return { isSave: false, message: "No fue posible guardar los datos." };
  }
  if (calificacion === undefined || calificacion < 5 || calificacion > 10) {
    return { isSave: false, message: "La calificación es inválida." };
  }


  return await updateTareaApi(id, calificacion)
    .then((response) => {
      if (response) {
        return {
          isSave: true,
          message: "La tarea se modifico con éxito",
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



export const getTarea = async (
  idUsuario: number,
  idMateria: number | undefined,
  codigoBarras: string,
  fecha: string | null,
  estatus: number
): Promise<StudentTarea | null> => {
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

  return await getTareasApi(
    idUsuario,
    idMateria,
    codigoBarras,
    fechaISO,
    estatus
  );
};
