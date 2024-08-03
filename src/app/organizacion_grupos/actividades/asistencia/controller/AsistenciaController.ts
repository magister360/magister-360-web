import { convertDateToISO } from "@/app/utils/DateUtils";
import {
  countFechasAsistenciasApi,
  createAsistenciaApi,
  createAsistenciasApi,
} from "../services/AsistenciaService";
import { AStudenAsistenciaType } from "@/app/types/asistencia/TypeAsistencia";
import { v4 as uuidv4 } from "uuid";

export const createAsistencia = async (
  id: string,
  fecha: string | null,
  asistencia: number,

  idAlumno: string,
  idUsuario: number,
  idMateria: number | undefined
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

export const createAsistencias = async (
  alumnosAsistencias: AStudenAsistenciaType[] | undefined,
  idUsuario: number | undefined,
  idMateria: number | undefined,
  fecha: string | null,
  estatus: number | undefined
): Promise<{
  isSave: boolean;
  message: string;
}> => {
  if (
    alumnosAsistencias === undefined ||
    alumnosAsistencias.length === 0 ||
    idUsuario === undefined ||
    idMateria === undefined ||
    fecha === null ||
    estatus === undefined
  ) {
    return { isSave: false, message: "No fue posible guardar los datos." };
  }
  const asistencias = alumnosAsistencias.map((asistencia) => ({
    id: uuidv4(),
    fecha: fecha,
    asistencia: asistencia.asistencia,
    estatus: estatus ?? 0,
    idAlumno: asistencia ? asistencia.id : "",
    idUsuario: idUsuario,
    idMateria: idMateria,
  }));

  const response = await createAsistenciasApi(asistencias)
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
  return response;
};

export const countFechasAsistencias = async (
  fecha: string | null,
  idMateria: number | undefined,
  estatus: number,
  idGrado: number | undefined,
  idGrupo: number | undefined
) => {
  if (
    fecha === null ||
    idMateria === undefined ||
    estatus === undefined ||
    idGrado === undefined ||
    idGrupo === undefined
  ) {
    return { isSave: true, message: "Fecha incorrecta" };
  }

  try {
    const fechaStr = convertDateToISO(fecha);

    if (fechaStr !== "") {
      const count = await countFechasAsistenciasApi(
        fechaStr,
        idMateria,
        estatus,
        idGrado,
        idGrupo
      );
      if (count) {
        return { isSave: true, message: "Existen asistencias guardadas." };
      } else {
        return { isSave: false, message: "Correcta" };
      }
    }
    return { isSave: true, message: "Error continuar" };
  } catch (error) {
    return { isSave: true, message: "Error continuar" };
  }
};
