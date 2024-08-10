import { getEncuadreCalificacionApi } from "../services/EncuadreCalificacionService";

export const getEncuadreCalificacion = async (
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idMateria: number | undefined,
  idUsuario: number | undefined
): Promise<any> => {
  if (
    idGrado === undefined ||
    idGrupo === undefined ||
    idMateria === undefined ||
    idUsuario === undefined
  ) {
    return null;
  }

  try {
    return await getEncuadreCalificacionApi(
      idGrado,
      idGrupo,
      idMateria,
      idUsuario
    );
  } catch (error) {
    return null;
  }
};
