"use client";
import Loading from "@/app/components/Loading";
import OptionsGrados, { filterIndexGrado } from "@/app/components/OptionGrados";
import OptionsGrupos, {
  filterIndexGrupo,
} from "@/app/components/OptionsGrupos";
import OptionsMaterias, {
  filterIndexMaterias,
} from "@/app/components/OptionsMaterias";
import SubmitButton from "@/app/components/SubmitButton";
import { useEffectFetchGradoGrupoMateria } from "@/app/hooks/GradoGrupoMateriaHook";
import { useEffect, useState } from "react";
import CheckboxWithSlider from "./conponenents/CheckboxWithSlider";

export default function EncuadreCalificacion() {
  const [isLoading, setIsLoading] = useState(true);
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

  const [participaciones, setParticipaciones] = useState({
    isChecked: false,
    value: 0,
  });
  const [tareas, setTareas] = useState({ isChecked: false, value: 0 });
  const [examenes, setExamenes] = useState({ isChecked: false, value: 0 });
  const [proyectos, setProyectos] = useState({ isChecked: false, value: 0 });

  const handleParticipacionesChange = (isChecked: boolean, value: number) => {
    setParticipaciones({ isChecked, value });
  };

  const handleTareasChange = (isChecked: boolean, value: number) => {
    setTareas({ isChecked, value });
  };

  const handleExamenesChange = (isChecked: boolean, value: number) => {
    setExamenes({ isChecked, value });
  };

  const handleProyectosChange = (isChecked: boolean, value: number) => {
    setProyectos({ isChecked, value });
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

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  return (
    <>
      <label
        className="mt-14 ml-72 block text-gray-700 dark:text-gray-200 font-bold text-xl mb-2"
        htmlFor="lbl-select-grado-grupo"
      >
        Encuadre calificación
      </label>

      <div className="mt-2 ml-72">
        <div
          className="rounded-lg shadow  
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  p-5"
        >
          <div>
            <label
              htmlFor="lbl-grado"
              className="block mb-2 text-sm font-medium text-gray-900
                        dark:text-white"
            >
              Grado
            </label>
            <select
              id="select-grado"
              className="block w-full p-2 mb-2 text-sm text-gray-900 
                         border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
                        focus:border-blue-500 dark:bg-[#1a2c32] dark:border-gray-600
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                        dark:focus:border-blue-500 "
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
              Grupo
            </label>
            <select
              id="select-grupo"
              className="block w-full p-2 mb-2 text-sm text-gray-900 
                            border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
                            focus:border-blue-500 dark:bg-[#1a2c32] dark:border-gray-600
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                            dark:focus:border-blue-500 "
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
              Materia
            </label>
            <select
              id="select-materia"
              className="block w-full p-2  text-sm text-gray-900 
                                    border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
                                  focus:border-blue-500 dark:bg-[#1a2c32] dark:border-gray-600
                                  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                 dark:focus:border-blue-500 "
              onChange={handleChangeMateria}
            >
              <OptionsMaterias itemsMaterias={itemsMaterias} />
            </select>
          </div>
        </div>
        <div
          className="rounded-lg shadow  
                        sm:max-w-xl  dark:bg-[#18181B] bg-[#ffffff]  p-5 mt-4"
        >
          <CheckboxWithSlider
            label="Participaciones"
            onValueChange={handleParticipacionesChange}
          />
          <CheckboxWithSlider
            label="Tareas"
            onValueChange={handleTareasChange}
          />
          <CheckboxWithSlider
            label="Examenes"
            onValueChange={handleExamenesChange}
          />
          <CheckboxWithSlider
            label="Proyectos"
            onValueChange={handleProyectosChange}
          />

          <div className="mt-4 flex justify-end items-end">
            <div className="mr-4">
              <label
                htmlFor="small"
                className="block text-sm font-medium text-gray-900
                         dark:text-white"
              >
                Total
              </label>
            </div>
            <div>
              <label
                htmlFor="small"
                className="text-3xl font-light text-gray-900 
                        dark:text-white"
              >
                100%
              </label>
            </div>
          </div>

          <div className="mt-2 mb-4">
            <label
              htmlFor="small"
              className="block mb-2 text-sm font-medium text-gray-900
                    dark:text-white"
            >
              Puntos extras
            </label>
            <div className="flex items-center space-x-3 sm:max-w-full">
              <div className="relative">
                <input type="checkbox" id="toggle" className="sr-only" />
                <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                <div
                  className="dot absolute left-1 top-1 bg-white w-6 h-6
                             rounded-full  transition"
                ></div>
              </div>
              <div className="relative ">
                <input type="checkbox" id="toggle2" className="sr-only" />
                <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                <div
                  key="rounded-a"
                  className="dot absolute left-1 top-1
                             bg-white w-6 h-6 rounded-full transition"
                ></div>
              </div>
              <div className="flex flex-col items-start -ml-4 ">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Redondear al entero
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ">
                  más próximo
                </span>
              </div>
            </div>
          </div>

          <SubmitButton buttonText="Guardar" additionalClassName=" max-w-sm" />
        </div>
      </div>
    </>
  );
}
