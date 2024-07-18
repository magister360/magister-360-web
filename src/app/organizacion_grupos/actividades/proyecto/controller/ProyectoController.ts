import { convertDateToISO } from "@/app/utils/DateUtils";

import { createProyectoApi, getProyectosApi, updateProyetoApi } from "../service/ProyectoService";
import { StudentProyecto } from "@/app/types/proyecto/TypeProyecto";

export const createProyecto = async (
  id: string,
  fecha: string | null,
  calificacion: number,
  contenido: string,
  idAlumno: string,
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

  return await createProyectoApi(
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
          message: "El proyecto se guardó con éxito",
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

export const updateProyecto = async (
  id: string,
  calificacion: number
): Promise<{ isSave: boolean; message: string }> => {
  
  if (id === undefined) {
    return { isSave: false, message: "No fue posible guardar los datos." };
  }
  if (calificacion === undefined || calificacion < 5 || calificacion > 10) {
    return { isSave: false, message: "La calificación es inválida." };
  }


  return await updateProyetoApi(id, calificacion)
    .then((response) => {
      if (response) {
        return {
          isSave: true,
          message: "El proyecto se modifico con éxito",
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


export const getProyecto = async (
  idUsuario: number,
  idMateria: number | undefined,
  codigoBarras: string,
  fecha: string | null,
  estatus: number
): Promise<StudentProyecto | null> => {
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

  return await getProyectosApi(
    idUsuario,
    idMateria,
    codigoBarras,
    fechaISO,
    estatus
  );
};
