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
import { NewModifyStudent } from "./components/NewModifyStudent";
import Image from "next/image";

export default function AlumnosVisualizar() {
  const { itemsGrados, itemsGrupos } = useEffectFetchGradoGrupo();

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isNewModifyStudentOpen, setIsNewModifyStudentOpen] = useState(false);
  const [studentSelect, setStudentSelect] = useState<StudentType>();
  const [students, setStudents] = useState<StudentType[]>([]);
  const [selectGrado, setSelectGrado] = useState({
    idGrado: -1,
    grado: "",
  });
  const [selectGrupo, setSelectGrupo] = useState({
    idGrupo: -1,
    grupo: "",
  });

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };
  const handleSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handlesetNewModifyStudentOpen = (student: StudentType | undefined) => {
    setIsNewModifyStudentOpen(true); //
    setStudentSelect(student);
  };

  const handleCloseNewModifyStudentOpen = () => {
    setIsNewModifyStudentOpen(false);
  };

  const { handleChangeGrado, handleChangeGrupo, fetchStudentsBarcode } =
    AlumnosFunctionsHook(
      itemsGrados,
      filterIndexGrado,
      itemsGrupos,
      filterIndexGrupo,
      setStudents,
      selectGrado,
      setSelectGrado,
      selectGrupo,
      setSelectGrupo,
      students
    );

  return (
    <>
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModal}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
      />

      <div className="mt-14 ml-72">
        <h3 className="mt-2 block text-gray-700 dark:text-gray-200 font-bold text-xl mb-2">
          Alumnos
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

        <div
          className="flex space-x-2 items-center justify-start rounded-lg shadow  
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  p-5 mt-2"
        >
          <Image
            className="dark:filter dark:invert dark:opacity-75 opacity-40 
                                filter-none w-auto h-7"
            src="/add.svg"
            alt="add"
            width={28}
            height={28}
            onClick={() => handlesetNewModifyStudentOpen(undefined)}
          />
          <label
            htmlFor="lbl-nuevo"
            className="block mb-2 text-sm font-medium 
                    text-gray-900 dark:text-white"
            onClick={() => handlesetNewModifyStudentOpen(undefined)}
          >
            Nuevo
          </label>
        </div>
        <div
          className="flex space-x-2 items-center justify-start rounded-lg shadow  
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  p-5 mt-2"
        >
          <button
            type="button"
            className="w-full text-white bg-[#438e96] hover:bg-[#3b757f] 
                        focus:ring-4 focus:outline-none 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                          dark:bg-[#438e96] dark:hover:bg-[#3b757f] "
            onClick={fetchStudentsBarcode}
          >
            Descargar PDF de alumnos con código de barras
          </button>
        </div>

        <TableAlumnosVisualizar
          students={students}
          handlesetNewModifyStudentOpen={handlesetNewModifyStudentOpen}
        />

        <NewModifyStudent
          isOpen={isNewModifyStudentOpen}
          onClose={handleCloseNewModifyStudentOpen}
          errorMessage=""
          studentSelect={studentSelect}
          idGrado={selectGrado.idGrado}
          idGrupo={selectGrupo.idGrupo}
        />
      </div>
    </>
  );
}
