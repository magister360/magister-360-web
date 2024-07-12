import { ItemGrado } from "@/app/types/types";
import { TypeStatusAlumno } from "@/app/utils/TypeStatusAlumno";
import { useEffect } from "react";

import { getAlumnos } from "../controller/AlumnosController";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";

export const AlumnosFunctionsHook = (
  itemsGrados: ItemGrado[],
  filterIndexGrado: Function,
  itemsGrupos: ItemGrado[],
  filterIndexGrupo: Function,
  setStudents: Function,
  selectGrado: { idGrado: number; grado: string },
  setSelectGrado: React.Dispatch<
    React.SetStateAction<{ idGrado: number; grado: string }>
  >,
  selectGrupo: { idGrupo: number; grupo: string },
  setSelectGrupo: React.Dispatch<
    React.SetStateAction<{ idGrupo: number; grupo: string }>
  >,
) => {
  const { idUsuario } = useSidebarContext();
  const isArrayEmpty = (array: any[]) => {
    return array.length === 0;
  };
  const handleChangeGrado = (event: { target: { selectedIndex: any } }) => {
    const selectedIndex = event.target.selectedIndex;

    if (!isArrayEmpty(itemsGrados)) {
      const itemFilter = filterIndexGrado({ itemsGrados }, selectedIndex);
      if (itemFilter) {
        setSelectGrado({
          idGrado: itemFilter.id,
          grado: itemFilter.grado,
        });
      }
    }
  };

  const handleChangeGrupo = (event: { target: { selectedIndex: any } }) => {
    const selectedIndex = event.target.selectedIndex;

    if (!isArrayEmpty(itemsGrupos)) {
      const itemFilter = filterIndexGrupo({ itemsGrupos }, selectedIndex);
      if (itemFilter) {
        setSelectGrupo({
          idGrupo: itemFilter.id,
          grupo: itemFilter.grupo,
        });
      }
    }
  };

  useEffect(() => {
    const indexGradoSelect = async () => {
      if (!isArrayEmpty(itemsGrados)) {
        const itemFilter = filterIndexGrado({ itemsGrados }, 0);
        if (itemFilter) {
          setSelectGrado({
            idGrado: itemFilter.id,
            grado: itemFilter.grado,
          });
        }
      }
    };
    indexGradoSelect();
  }, [itemsGrados]);

  useEffect(() => {
    const indexGrupoSelect = async () => {
      if (!isArrayEmpty(itemsGrupos)) {
        const itemFilter = filterIndexGrupo({ itemsGrupos }, 0);
        if (itemFilter) {
          setSelectGrupo({
            idGrupo: itemFilter.id,
            grupo: itemFilter.grupo,
          });
        }
      }
    };
    indexGrupoSelect();
  }, [itemsGrupos]);

  useEffect(() => {
    const fetchAlumnos = async () => {
      const userId = idUsuario ?? -1;
      try {
        const students = await getAlumnos(
          userId,
          TypeStatusAlumno.ALTA,
          TypeStatusAlumno.BAJA,
          TypeStatusAlumno.CAMBIO,
          selectGrado.idGrado,
          selectGrupo.idGrupo
        );
        setStudents(students);
      } catch (error) {}
    };
    if (selectGrado.idGrado !== -1 && selectGrupo.idGrupo !== -1) {
      fetchAlumnos();
    }
  }, [selectGrado, selectGrupo]);


  return {
    handleChangeGrado,
    handleChangeGrupo,
    selectGrado,
    selectGrupo,
   
  };
};
