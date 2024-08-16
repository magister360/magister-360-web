import { getFechasPeriodosApi } from "../service/PeriodosEvaluacionService";

export const getFechasPeriodos = async (
  idUsuario: number | undefined,
  estatus: number
) => {
  if (idUsuario === undefined) {
    return null;
  }
  return await getFechasPeriodosApi(idUsuario, estatus);
};
