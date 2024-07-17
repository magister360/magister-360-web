import { v4 as uuidv4 } from "uuid";
import {
  createFechasPeriodosApi,
  deleteFechasPeriodosApi,
  getFechasPeriodosApi,
  updateFechasPeriodosApi,
} from "../service/PeriodosService";
import { PeriodoEvaluacion } from "@/app/types/periodos_evaluacion/TypePeriodosEvaluacion";

export const createFechasPeriodos = async (
  id: string | undefined,
  noPeriodo: number,
  fechaInicial: Date | null,
  fechaFinal: Date | null,
  actividad: string,
  estatus: number,
  periodos: PeriodoEvaluacion[] | null,
  idUsuario: number | undefined
): Promise<{ success: boolean; message: string }> => {
  if (actividad === undefined || idUsuario === undefined) {
    return { success: false, message: "Datos incompletos o inválidos" };
  }

  const isValdRangeDate = isOutsideAllPeriods(
    fechaInicial,
    fechaFinal,
    periodos
  );
  if (!isValdRangeDate) {
    return { success: false, message: "Fechas incorrectas" };
  }

  if (fechaInicial === null || fechaFinal === null) {
    return { success: false, message: "Las fechas son incorrectas" };
  }

  if (fechaInicial > fechaFinal) {
    return {
      success: false,
      message: "La fecha de inicio no puede ser mayor que la fecha final",
    };
  }

  try {
    if (id === undefined) {
      const result = await createFechasPeriodosApi(
        uuidv4(),
        noPeriodo,
        fechaInicial,
        fechaFinal,
        actividad,
        estatus,
        idUsuario
      );

      if (result) {
        return {
          success: true,
          message: "Fechas de períodos creadas con éxito",
        };
      } else {
        return {
          success: false,
          message: "No se pudieron crear las fechas de períodos",
        };
      }
    } else {
      const result = await updateFechasPeriodosApi(
        id,
        fechaInicial,
        fechaFinal
      );

      if (result) {
        return {
          success: true,
          message: "Fechas de períodos se modifico con éxito",
        };
      } else {
        return {
          success: false,
          message: "No se pudieron modificar las fechas de períodos",
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      message: "Ocurrió un error al procesar la solicitud",
    };
  }
};

export const deleteFechasPeriodos = async (
  id: string | undefined,
  estatus: number
): Promise<{ success: boolean; message: string }> => {
  if (id === undefined) {
    return { success: false, message: "Datos incompletos o inválidos" };
  }

  const result = await deleteFechasPeriodosApi(id, estatus);
  if (result) {
    return {
      success: true,
      message: "El período se elimino con éxito",
    };
  } else {
    return {
      success: false,
      message: "Error al eliminar período",
    };
  }
};

export const getFechasPeriodos = async (idUsuario: number, estatus: number) => {
  if (idUsuario === undefined) {
    return null;
  }
  return await getFechasPeriodosApi(idUsuario, estatus);
};

function isOutsideAllPeriods(
  startDate: Date | null,
  endDate: Date | null,
  periods: PeriodoEvaluacion[] | null
): boolean {
  if (!startDate || !endDate || !periods || periods.length === 0) {
    return false;
  }

  return periods.every((periodo) => {
    const periodStart = new Date(periodo.fechaInicial);
    const periodEnd = new Date(periodo.fechaFinal);

    return endDate < periodStart || startDate > periodEnd;
  });
}
