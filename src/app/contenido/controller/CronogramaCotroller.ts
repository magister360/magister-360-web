import { getCronogramaApi } from "../services/CronogramaService";

export const getCronograma = async (
  idUsuario: number | undefined,
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idMateria: number | undefined
) => {
  if (
    idUsuario === undefined ||
    idGrado === undefined ||
    idGrupo === undefined ||
    idMateria === undefined
  ) {
    return null;
  }
  return await getCronogramaApi(idUsuario, idGrado, idGrupo, idMateria);
};
