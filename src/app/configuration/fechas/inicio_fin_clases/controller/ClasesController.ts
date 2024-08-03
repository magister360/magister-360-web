import { InicioFinClases } from "@/app/types/inicio_fin_clases/TypeInicioFinClases";
import {
  createFechaInicioFinClasesApi,
  getFechaInicioFinClasesApi,
  updateFechaInicioFinClasesApi,
} from "../services/ClasesService";

export const createFechaInicioFinClases = async (
  id: number | undefined,
  fechaInicial: Date | null,
  fechaFinal: Date | null,
  idUsuario: number | undefined
): Promise<{ success: boolean; message: string }> => {
  if (idUsuario === undefined || fechaInicial === null || fechaFinal === null) {
    return { success: false, message: "Datos incompletos o inválidos" };
  }

  if (id === undefined) {
    const result = await createFechaInicioFinClasesApi(
      fechaInicial,
      fechaFinal,
      idUsuario
    );
    if (result) {
      return {
        success: true,
        message: "Fechas se guardaron con éxito",
      };
    } else {
      return {
        success: false,
        message: "No es posible guardar las fechas",
      };
    }
  } else {
    const result = await updateFechaInicioFinClasesApi(
      id,
      fechaInicial,
      fechaFinal
    );
    if (result) {
      return {
        success: true,
        message: "Fechas se modificaron con éxito",
      };
    } else {
      return {
        success: false,
        message: "No es posible guardar las fechas",
      };
    }
  }
};

export const getFechaInicioFinClases = async (
  idUsuario: number | undefined
): Promise<InicioFinClases | null> => {
  if (idUsuario === undefined) return null;

  return await getFechaInicioFinClasesApi(idUsuario);
};
