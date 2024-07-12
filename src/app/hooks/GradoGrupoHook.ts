import { useEffect, useState } from "react";
import { TypeStatusGrado } from "../utils/TypeStatusGrado";
import { getGrados } from "../configuration/grado/controller/GradoController";
import { getGrupos } from "../configuration/grupo/controller/GrupoController";
import { TypeStatusGrupo } from "../utils/TypeStatusGrupo";
import { useSidebarContext } from "../sidebar/SidebarContext";

export const useEffectFetchGradoGrupo = () => {
  const { idUsuario } = useSidebarContext();
  const [itemsGrados, setItemsGrados] = useState([]);
  const [itemsGrupos, setItemsGrupos] = useState([]);
  useEffect(() => {
    const userId = idUsuario ?? -1;

    const fetchGrados = async () => {
      const grados = await getGrados(userId, TypeStatusGrado.ALTA);
      return grados || [];
    };

    const fetchGrupos = async () => {
      const grupos = await getGrupos(userId, TypeStatusGrupo.ALTA);
      return grupos || [];
    };

    Promise.all([fetchGrados(), fetchGrupos()])
      .then(([grados, grupos]) => {
        setItemsGrados(grados);
        setItemsGrupos(grupos);
      })
      .catch((error) => {
        
      });
  }, []);
  return {
    itemsGrados,
    itemsGrupos,
  };
};
