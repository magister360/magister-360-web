import { searchMaterialApi } from "../services/SearchMaterialService";

export const searchMaterial = async (
  idGrado: number,
  idGrupo: number,
  idMateria: number
) => {

  if (
    idGrado === undefined ||
    idGrado <= 0 ||
    idGrupo === undefined ||
    idGrupo <= 0 ||
    idMateria === undefined ||
    idMateria <= 0
  ) {
    return null;
  }

  const limit = 10;
  return searchMaterialApi(idGrado, idGrupo, idMateria, limit);
};
