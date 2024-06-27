import { searchMaterialTituloApi } from "../services/MaterialDidacticoService";

export const fechSearchMaterialTitulo = async (
    idGrado: number,
    idGrupo: number,
    idMateria: number,
    textSearch:string
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
    return searchMaterialTituloApi(idGrado, idGrupo, idMateria, limit,textSearch);
  };
  