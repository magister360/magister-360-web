import { convertDateToISO } from "@/app/utils/DateUtils";
import { createFechaFestivaApi } from "../services/FechaFestivaService";

export const createFechaFestiva = async (
  fecha: string | null,
  actividad: string | undefined,

  idUsuario: number | undefined
): Promise<{ success: boolean; message: string }> => {
  if (actividad === undefined || idUsuario === undefined || fecha === null) {
    return { success: false, message: "Datos incompletos o inválidos" };
  }

  const fechaISO = convertDateToISO(fecha);
  if (fechaISO === "") {
    return { success: false, message: "Fecha incorreecta" };
  }
  const result = await createFechaFestivaApi(fechaISO, actividad, idUsuario);
  if (result) {
    return {
      success: true,
      message: "Fechas festivas guardadas con éxito",
    };
  }

  return { success: false, message: "Error al guardar" };
};
