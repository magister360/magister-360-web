import { getEncuadreApi } from "../service/EncuadreService";

export const getEncuadre = async (
    idGrado: number,
    idGrupo: number,
    idMateria: number,
    idUsuario: number
  ): Promise<any> => {
    if (idGrado <= 0 || idGrupo <= 0 || idMateria <= 0 || idUsuario <= 0) {
      return null;
    }
  
    try {
      return await getEncuadreApi(
        idGrado,
        idGrupo,
        idMateria,
        idUsuario
      );
    } catch (error) {
      return null;
    }
  };
  