"use client";

import { useForm } from "react-hook-form";
import OptionsGrados, { filterIndexGrado } from "../components/OptionGrados";
import OptionsGrupos, { filterIndexGrupo } from "../components/OptionsGrupos";
import OptionsMaterias, {
  filterIndexMaterias,
} from "../components/OptionsMaterias";
import { useEffectFetchGradoGrupoMateria } from "../hooks/GradoGrupoMateriaHook";
import { useCallback, useEffect, useState } from "react";
import { DocumentTypeValues } from "../utils/DocumentTypeValues";

import ErrorModal from "../components/ErrorModal ";
import SuccessModal from "../components/SuccessModal";
import { NewModifyMaterialDidactico } from "./components/NewModifyMaterialDidactico";
import Image from "next/image";
import TableMaterialDidactico from "./components/TableMaterialDidactico";
import { MaterialDidacticoType } from "../types/types";
import { SearchMaterialHook } from "./hooks/SearchMaterialHook";
import { DocumentHook } from "./hooks/DocumentHook";
import { deleteMaterialDidactico } from "./controller/DocumentController";

export default function OrganizacionMaterialDidactico() {
  const { itemsGrados, itemsGrupos, itemsMaterias } =
    useEffectFetchGradoGrupoMateria();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isNewMaterialDidacticoOpen, setIsNewMaterialDidacticoOpen] =
    useState(false);
  const [materialDidacticos, setMaterialDidacticos] = useState<
    MaterialDidacticoType[]
  >([]);

  const [selectMaterialDidacticoType, setSelectMaterialDidacticoType] =
    useState<MaterialDidacticoType | null>(null);

  const handleCloseNewMaterialDidacticoOpen = () => {
    setIsNewMaterialDidacticoOpen(false);
  };

  const handlesetNewMaterialDidacticoOpen = () => {
    setIsNewMaterialDidacticoOpen(true);
  };

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

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };
  const handleSuccessModal = () => {
    setIsSuccessModalOpen(false);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  useEffect(() => {
    if (watch("tipo_document") !== DocumentTypeValues.YOUTUBE.type) {
      setValue("url-youtube", "");
    }
  }, [watch("tipo_document")]);

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

  const fetchMaterialDidacticos = SearchMaterialHook(
    selectGrado.idGrado,
    selectGrupo.idGrupo,
    selectMateria.idMateria,
    setMaterialDidacticos
  );

  const onSubmit = useCallback(
    DocumentHook(
      reset,
      setIsSuccessModalOpen,
      setIsErrorModalOpen,
      setErrorMessage,
      setSuccessMessage,
      selectGrado.idGrado,
      selectGrupo.idGrupo,
      selectMateria.idMateria,
      selectMaterialDidacticoType,
      fetchMaterialDidacticos
    ).onSubmit,
    [
      selectGrado.idGrado,
      selectGrupo.idGrupo,
      selectMateria.idMateria,
      reset,
      setIsSuccessModalOpen,
      setIsErrorModalOpen,
      setErrorMessage,
      setSuccessMessage,
      selectMaterialDidacticoType,
      fetchMaterialDidacticos,
    ]
  );

  const handleClickRemove = async (id: string) => {
    const confirmar = window.confirm(
      "¿Está seguro de eliminar el material didáctico?"
    );
    if (confirmar) {
      const remove = await deleteMaterialDidactico(id);
      if (remove === true) {
        setSuccessMessage("El material didáctico se elimino con éxito.");
        setIsSuccessModalOpen(true);
        fetchMaterialDidacticos();
      } else {
        setErrorMessage(
          "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde."
        );
        setIsErrorModalOpen(true);
      }
    }
  };

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
      <div className="mt-14 ml-72 overflow-x-hidden">
        <h3 className="pt-2 pb-2  text-gray-700 dark:text-gray-200 font-bold text-xl ">
          Organización material didáctico
        </h3>
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
              htmlFor="lbl_materia"
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
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  p-5 mt-4"
        >
          <div className="flex space-x-3 items-center">
            <Image
              className="dark:filter dark:invert dark:opacity-75 opacity-40 
                                filter-none w-auto h-7 "
              src="/add.svg"
              alt="add"
              width={28}
              height={28}
              onClick={() => handlesetNewMaterialDidacticoOpen()}
            />
            <label
              htmlFor="lbl-nuevo"
              className="block mb-2 text-sm font-medium 
                    text-gray-900 dark:text-white"
              onClick={() => handlesetNewMaterialDidacticoOpen()}
            >
              Nuevo
            </label>
          </div>
        </div>

        <TableMaterialDidactico
          materialDidacticos={materialDidacticos}
          selecttMaterialDidacticoType={setSelectMaterialDidacticoType}
          handlesetNewMaterialDidacticoOpen={handlesetNewMaterialDidacticoOpen}
          handleClickRemove={handleClickRemove}
        />

        <NewModifyMaterialDidactico
          setValue={setValue}
          isOpen={isNewMaterialDidacticoOpen}
          onClose={handleCloseNewMaterialDidacticoOpen}
          register={register}
          watch={watch}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          successMessage={successMessage}
          errorMessage={errorMessage}
          reset={reset}
          selectMaterialDidacticoType={selectMaterialDidacticoType}
        />
      </div>
    </>
  );
}
