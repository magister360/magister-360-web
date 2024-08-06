import { convertDateToISO } from "@/app/utils/DateUtils";
import {
  createFechaFestivaApi,
  getFechasFestivasApi,
} from "../services/FechaFestivaService";
import { EstatusFechafestivaType } from "@/app/estatus/EstatusType";
import { FechaFestiva } from "@/app/types/fecha_festiva/TypeFechaFestiva";

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
  const result = await createFechaFestivaApi(
    fechaISO,
    actividad,
    idUsuario,
    EstatusFechafestivaType.OK
  );
  if (result) {
    return {
      success: true,
      message: "Fechas festivas guardadas con éxito",
    };
  }

  return { success: false, message: "Error al guardar" };
};

export const getFechasFestivas = async (
  idUsuario: number | undefined,
  estatus: number
): Promise<FechaFestiva[] | null> => {
  if (idUsuario === undefined) return null;

  return await getFechasFestivasApi(idUsuario, estatus);
};
