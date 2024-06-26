import { useCallback, useEffect } from "react";
import { searchMaterial } from "../controller/SearchMaterialController";
import { MaterialDidacticoType } from "@/app/types/types";

export const SearchMaterialHook = (
  idGrado: number,
  idGrupo: number,
  idMateria: number,
  setMaterialDidacticos: React.Dispatch<
    React.SetStateAction<MaterialDidacticoType[]>
  >
): (() => Promise<void>) => {
  const fetchMaterialDidacticos = useCallback(async () => {
    const materialDidacticos = await searchMaterial(
      idGrado,
      idGrupo,
      idMateria
    );
    setMaterialDidacticos(materialDidacticos);
  }, [idMateria, idGrupo, idMateria]);

  useEffect(() => {
    fetchMaterialDidacticos();
  }, [fetchMaterialDidacticos]);

  return fetchMaterialDidacticos;
};
