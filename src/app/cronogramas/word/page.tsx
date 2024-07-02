"use client";

import OptionsGrados from "@/app/components/OptionGrados";
import OptionsGrupos from "@/app/components/OptionsGrupos";
import OptionsMaterias from "@/app/components/OptionsMaterias";
import { useEffectFetchGradoGrupoMateria } from "@/app/hooks/GradoGrupoMateriaHook";

export default function Word() {
  const { itemsGrados, itemsGrupos, itemsMaterias } =
    useEffectFetchGradoGrupoMateria();
  return (
    <div className="mt-16 ml-72">
      <h3 className="mt-2  block text-gray-700 dark:text-gray-200 font-bold text-xl mb-2">
        Cronogramas de word
      </h3>
      <div
        className="rounded-lg shadow  
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  p-5"
      >
        <div>
          <label
            htmlFor="small"
            className="block mb-2 text-sm font-medium
                     text-gray-900 dark:text-white"
          >
            Grado
          </label>
          <select
            id="select-grado"
            className="block w-full p-2 mb-2 text-sm 
                    text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1a2c32]
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500 "
          >
            <OptionsGrados itemsGrados={itemsGrados} />
          </select>
        </div>

        <div>
          <label
            htmlFor="lbl-grupo"
            className="block mb-2 text-sm font-medium 
                    text-gray-900 dark:text-white"
          >
            Grupo
          </label>
          <select
            id="select-grupo"
            className="block w-full p-2 mb-0 text-sm 
                    text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1a2c32]
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500 "
          >
            <OptionsGrupos itemsGrupos={itemsGrupos} />
          </select>
        </div>

        <div>
          <label
            htmlFor="lbl-grupo"
            className="block mb-2 mt-2 text-sm font-medium 
                    text-gray-900 dark:text-white"
          >
            Materia
          </label>
          <select
            id="select-grupo"
            className="block w-full p-2 mb-0 text-sm 
                    text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1a2c32]
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500 "
          >
            <OptionsMaterias itemsMaterias={itemsMaterias} />
          </select>
        </div>
      </div>
      <div
        className="rounded-lg shadow  
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  p-5 mt-4"
      >
        <label
          className="block text-gray-700 dark:text-gray-200 font-bold text-sm "
          htmlFor="fileInput"
        >
          Subir archivo
        </label>
        <input
          className=" bg-gray-50 border border-gray-300 
                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                           focus:border-primary-600 block max-w-sm p-2.5 dark:bg-[#1a2c32]
                           dark:border-gray-600 dark:placeholder-gray-400
                           dark:text-white dark:focus:ring-blue-500 
                           dark:focus:border-blue-500  mt-2"
          id="fileInput"
          type="file"
          accept=".xlsx"
        />
      </div>
    </div>
  );
}
