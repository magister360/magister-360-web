import { ItemGrado, ItemGrupo, ItemMateria } from "@/app/types/types";
import { fetchCreateFolderApi } from "../services/FoldersDocuementsService";

export const fetchCreateFolder = async (
  itemsGrados: ItemGrado[],
  itemsGrupos: ItemGrupo[],
  itemsMaterias: ItemMateria[]
): Promise<boolean> => {
  if (
    itemsGrados.length === 0 ||
    itemsGrupos.length === 0 ||
    itemsMaterias.length === 0
  ) {
    return false;
  }
  const grados = itemsGrados.map((item) => item.grado);
  const grupos = itemsGrupos.map((item) => item.grupo);
  const materias = itemsMaterias.map((item) => item.materia);

  return fetchCreateFolderApi(grados, grupos, materias);
};
