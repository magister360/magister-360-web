import { getPeriodosApi } from "../service/PeriodosService";


export const getPeriodos = async (idUsuario: number, estatus: number) => {
    if (idUsuario === undefined) {
      return null;
    }
    return await getPeriodosApi(idUsuario, estatus);
  };
  