"use client";

import ErrorModal from "@/app/components/ErrorModal ";
import OptionsGrados, { filterIndexGrado } from "@/app/components/OptionGrados";
import OptionsGrupos, {
  filterIndexGrupo,
} from "@/app/components/OptionsGrupos";
import SuccessModal from "@/app/components/SuccessModal";
import { useEffectFetchGradoGrupo } from "@/app/hooks/GradoGrupoHook";
import { useEffect, useState } from "react";
import { AlumnosFunctionsHook } from "./hooks/AlumnosFunctionsHook";
import TableAlumnosVisualizar from "./components/TableAlumnosVisualizar";
import { StudentType } from "@/app/types/types";
import NewModifyStudent from "./components/NewModifyStudent";

export default function AlumnosVisualizar() {
  const { itemsGrados, itemsGrupos } = useEffectFetchGradoGrupo();

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };
  const handleSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const [students, setStudents] = useState<StudentType[]>([]);

  const { handleChangeGrado, handleChangeGrupo } = AlumnosFunctionsHook(
    itemsGrados,
    filterIndexGrado,
    itemsGrupos,
    filterIndexGrupo,
    setStudents
  );

  return (
    <>
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        errorMessage={errorMessage}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModal}
        successMessage="Los alumnoss se guardaron con éxito."
      />
      <label
        className="mt-14 ml-72 block text-gray-700 dark:text-gray-200 font-bold text-xl mb-2"
        htmlFor="lbl-select-grado-grupo"
      >
        Alumnos
      </label>
      <div className="mt-2 ml-72">
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
              onChange={handleChangeGrado}
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
              onChange={handleChangeGrupo}
            >
              <OptionsGrupos itemsGrupos={itemsGrupos} />
            </select>
          </div>
        </div>

        <TableAlumnosVisualizar students={students} />

        <NewModifyStudent />
      </div>
    </>
  );
}
