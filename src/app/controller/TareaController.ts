import { EstatusTareaType } from "../estatus/EstatusType";
import { getTareaFechasApi } from "../service/TareaService";

  
  export const getTareaFechas = async (
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
      return await getTareaFechasApi(
        idGrado,
        idGrupo,
        idUsuario,
        idMateria,
        dateStart,
        dateEnd,
        EstatusTareaType.OK
      );
    } catch (error) {
      return [];
    }
  };
  