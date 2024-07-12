"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import OptionsGrados, { filterIndexGrado } from "../components/OptionGrados";
import OptionsGrupos, { filterIndexGrupo } from "../components/OptionsGrupos";
import OptionsMaterias, {
  filterIndexMaterias,
} from "../components/OptionsMaterias";
import { useEffectFetchGradoGrupoMateria } from "../hooks/GradoGrupoMateriaHook";
import { useSidebarContext } from "../sidebar/SidebarContext";
import { SvgIcons } from "../svg/SvgIcons";
import Loading from "../components/Loading";

export default function SectionGGM() {
  const router = useRouter();
  const { updateContextField } = useSidebarContext();
  const { itemsGrados, itemsGrupos, itemsMaterias, isFetch } =
    useEffectFetchGradoGrupoMateria();
  const [selectGrado, setSelectGrado] = useState({
    idGrado: -1,
    grado: "",
  });
  const [selectGrupo, setSelectGrupo] = useState({
    idGrupo: -1,
    grupo: "",
  });
  const [selectMateria, setSelectMateria] = useState({
    idMateria: -1,
    materia: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      (itemsGrados.length > 0 &&
        itemsGrupos.length > 0 &&
        itemsMaterias.length > 0) ||
      isFetch
    ) {
      setIsLoading(false);
    }
  }, [itemsGrados, itemsGrupos, itemsMaterias, isFetch]);

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    event.preventDefault();
    initializeSectionGGM();
    const redericcionar =
      itemsGrados.length === 0 ||
      itemsGrupos.length === 0 ||
      itemsMaterias.length === 0
        ? "/error_selection"
        : "/contenido";
    router.push(redericcionar);
    setIsLoading(false)
  };

  const initializeSectionGGM = () => {
    updateContextField("visibleSidebar", true);
    updateContextField("grado", selectGrado.grado);
    updateContextField("idGrado", selectGrado.idGrado);
    updateContextField("grupo", selectGrupo.grupo);
    updateContextField("idGrupo", selectGrupo.idGrupo);
    updateContextField("materia", selectMateria.materia);
    updateContextField("idMateria", selectMateria.idMateria);
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

  const handleChangeMateria = (event: { target: { selectedIndex: any } }) => {
    const selectedIndex = event.target.selectedIndex;
    if (!isArrayEmpty(itemsGrupos)) {
      const itemFilter = filterIndexMaterias({ itemsMaterias }, selectedIndex);
      if (itemFilter) {
        setSelectMateria({
          idMateria: itemFilter.id,
          materia: itemFilter.materia,
        });
      }
    }
  };
  const isArrayEmpty = (array: any[]) => {
    return array.length === 0;
  };

  useEffect(() => {
    const selectElement = document.getElementById(
      "select-grado"
    ) as HTMLSelectElement | null;
    if (selectElement) {
      handleChangeGrado({
        target: selectElement,
      });
    }
  }, [itemsGrados]);

  useEffect(() => {
    const selectElement = document.getElementById(
      "select-grupo"
    ) as HTMLSelectElement | null;
    if (selectElement) {
      handleChangeGrupo({
        target: selectElement,
      });
    }
  }, [itemsGrupos]);

  useEffect(() => {
    const selectElement = document.getElementById(
      "select-materia"
    ) as HTMLSelectElement | null;
    if (selectElement) {
      handleChangeMateria({
        target: selectElement,
      });
    }
  }, [itemsMaterias]);

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  return (
    <div
      className="flex flex-col items-center justify-center px-6 py-0 mx-auto 
            md:h-screen lg:py-0"
    >
      <div
        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 
                        sm:max-w-md xl:p-0 dark:bg-[#1a2c32] dark:border-gray-700 "
      >
        <form className="max-w-sm mx-auto mt-10 mb-10" onSubmit={onSubmitForm}>
          {itemsGrados.length !== 0 &&
            itemsGrupos.length !== 0 &&
            itemsMaterias.length !== 0 && (
              <>
                <h3
                  className="mt-0 ml-2 mb-4 block text-gray-700 dark:text-gray-200 font-bold 
                text-xl "
                >
                  ¿A quién voy a dar clases?
                </h3>
                <div>
                  <label
                    htmlFor="small"
                    className="block mb-2 text-sm font-medium text-gray-900
                          dark:text-white"
                  >
                    Seleccione grado
                  </label>
                  <select
                    id="select-grado"
                    className="bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                                 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-gray-500 
                                  dark:focus:border-gray-500 mb-6 "
                    onChange={handleChangeGrado}
                  >
                    <OptionsGrados itemsGrados={itemsGrados} />
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="small"
                    className="block mb-2 text-sm font-medium text-gray-900
                            dark:text-white"
                  >
                    Seleccione grupo
                  </label>
                  <select
                    id="select-grupo"
                    className="bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                                 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-gray-500 
                                  dark:focus:border-gray-500 mt-2 mb-6"
                    onChange={handleChangeGrupo}
                  >
                    <OptionsGrupos itemsGrupos={itemsGrupos} />
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="small"
                    className="block mb-2 text-sm font-medium text-gray-900
                    dark:text-white"
                  >
                    Seleccione materia
                  </label>
                  <select
                    id="select-materia"
                    className="bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                                 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-gray-500 
                                  dark:focus:border-gray-500 mt-2 mb-6 "
                    onChange={handleChangeMateria}
                  >
                    <OptionsMaterias itemsMaterias={itemsMaterias} />
                  </select>
                </div>
              </>
            )}

          <button
            type="submit"
            className="w-full text-white bg-[#438e96] hover:bg-[#3b757f] 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                          dark:bg-[#438e96] dark:hover:bg-[#3b757f]   "
          >
            Continuar
          </button>
        </form>
      </div>

      {(itemsGrados.length === 0 ||
        itemsGrupos.length === 0 ||
        itemsMaterias.length === 0) && (
        <div
          className="w-full mb-4 p-3 bg-white rounded-lg shadow dark:border md:mt-0 
                        sm:max-w-md xl:p-0 dark:bg-[#1a2c32] dark:border-gray-700 "
        >
          <p className="dark:text-gray-500">
            No existen grados, grupos y materias guardados.
          </p>
          {itemsGrados.length === 0 && (
            <div className="flex gap-4 mt-2">
              <SvgIcons.Circle />
              <p className="dark:text-gray-500">Ir a configuracion - grado</p>
            </div>
          )}
          {itemsGrupos.length === 0 && (
            <div className="flex gap-4 mt-2">
              <SvgIcons.Circle />
              <p className="dark:text-gray-500">Ir a configuracion - grupo</p>
            </div>
          )}
          {itemsMaterias.length === 0 && (
            <div className="flex gap-4 mt-2">
              <SvgIcons.Circle />
              <p className="dark:text-gray-500">Ir a configuracion - materia</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
