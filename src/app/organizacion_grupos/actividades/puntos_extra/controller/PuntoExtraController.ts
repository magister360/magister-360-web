import { StudentPuntoExtra } from "@/app/types/puntos_extra/TypePuntoExtra";
import { convertDateToISO } from "@/app/utils/DateUtils";
import { createPuntoExtrApi, getPuntoExtraApi } from "../service/PuntoExtraService";

export const createPuntoExtra = async (
  id: string,
  fecha: string | null,
  calificacion: number,
  contenido: string,
  idAlumno: string,
  idUsuario: number,
  idMateria: number | undefined,
  estatus:number
): Promise<{ isSave: boolean; message: string }> => {
  if (
    idAlumno === undefined ||
    idAlumno.length === 0 ||
    idMateria === undefined ||
    idMateria <= 0 ||
    calificacion === undefined ||
    idUsuario === undefined ||
    idUsuario <= 0 ||
    fecha === null
  ) {

    return { isSave: false, message: "No fue posible guardar los datos." };
  }

  const fechaISO = convertDateToISO(fecha);

  return await createPuntoExtrApi(
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
          message: "El punto extra se guardó con éxito",
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
        console.log(error)
      return { isSave: false, message: "No fue posible guardar los datos." };
    });
};

export const getPuntoExtra = async (
  idUsuario: number,
  idMateria: number | undefined,
  codigoBarras: string,
  fecha: string | null,
  estatus: number
): Promise<StudentPuntoExtra | null> => {
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

  return await getPuntoExtraApi(
    idUsuario,
    idMateria,
    codigoBarras,
    fechaISO,
    estatus
  );
};
