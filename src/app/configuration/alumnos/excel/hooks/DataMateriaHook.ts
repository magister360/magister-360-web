import { getMaterias } from "@/app/configuration/materia/controller/MateriaController";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import { ItemMateria } from "@/app/types/types";
import { TypeStatusMateria } from "@/app/utils/TypeStatusMateria";
import { useEffect, useState } from "react";

export const useEffectFetchDataMateria = () => {
  const { idUsuario } = useSidebarContext();
  const [materiasSinAsignar, setMateriasSinAsignar] = useState<ItemMateria[]>(
    []
  );
  const [materiasAsignadas, setMateriasAsignadas] = useState<ItemMateria[]>([]);

  const removeMateriaSinAsignar = (id: number, index: number) => {
    if (materiasSinAsignar.length !== 0) {
      const materiaSinAsignar = materiasSinAsignar[index];
      const newMateriaSinAsignar = materiasSinAsignar.filter(
        (materia) => materia.id !== id
      );
      setMateriasSinAsignar(newMateriaSinAsignar);

      addMatriaAsignada(materiaSinAsignar);
    }
  };

  const addMatriaAsignada = (nuevaMateria: ItemMateria) => {
    setMateriasAsignadas((prevMaterias) => [...prevMaterias, nuevaMateria]);
  };

  const removeMateriaAsignar = (id: number, index: number) => {
    if (materiasAsignadas.length !== 0) {
      const materiaAsignada = materiasAsignadas[index];
      const newMateriaAsignada = materiasAsignadas.filter(
        (materia) => materia.id !== id
      );
      setMateriasAsignadas(newMateriaAsignada);

      addMatriaSinAsignar(materiaAsignada);
    }
  };

  const addMatriaSinAsignar = (nuevaMateria: ItemMateria) => {
    setMateriasSinAsignar((prevMaterias) => [...prevMaterias, nuevaMateria]);
  };

  useEffect(() => {
    const userId = idUsuario ?? -1;

    const fetchMaterias = async () => {
      const materias = await getMaterias(userId, TypeStatusMateria.ALTA);

      return materias || [];
    };

    Promise.all([fetchMaterias()])
      .then(([materias]) => {
        setMateriasSinAsignar(materias);
      })
      .catch((error) => {});
  }, []);

  return {
    materiasSinAsignar,
    materiasAsignadas,
    removeMateriaSinAsignar,
    removeMateriaAsignar,
  };
};
