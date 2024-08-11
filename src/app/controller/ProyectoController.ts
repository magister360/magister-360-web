import {
  EstatusProyectoType,
} from "../estatus/EstatusType";
import { getProyectoFechasApi } from "../service/ProyectoService";

export const getProyectoFechas = async (
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idMateria: number | undefined,
  idUsuario: number | undefined,
  fechaInicial: string | undefined,
  fechaFinal: string | undefined
): Promise<string[]> => {
  if (
    idGrado === undefined ||
    idGrupo === undefined ||
    idMateria === undefined ||
    idUsuario === undefined ||
    idMateria <= 0 ||
    idUsuario <= 0 ||
    fechaInicial === undefined ||
    fechaFinal === undefined
  ) {
    return [];
  }

  try {
    const dateStart = new Date(fechaInicial);
    const dateEnd = new Date(fechaFinal);
    return await getProyectoFechasApi(
      idGrado,
      idGrupo,
      idUsuario,
      idMateria,
      dateStart,
      dateEnd,
      EstatusProyectoType.OK
    );
  } catch (error) {
    return [];
  }
};
