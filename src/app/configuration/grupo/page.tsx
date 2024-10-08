"use client";

import ErrorMessageInput from "@/app/components/ErrorMessageInput";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import { GrupoFunctionsHook } from "./hooks/GrupoFunctionsHook";
import ErrorModal from "@/app/components/ErrorModal ";
import SuccessModal from "@/app/components/SuccessModal";
import TableGrupo from "./components/TableGrupo";
import Loading from "@/app/components/Loading";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";

export default function Grupo() {
  const { isMenuVisible } = useSidebarContext();
  const [items, setItems] = useState([]);
  const [newModify, setNewModify] = useState(true);
  const [idSelect, setIdSelect] = useState(-1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };
  const handleSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const { onSubmit, handleClickRemove, handleClickUpdate, handleClickNew } =
    GrupoFunctionsHook(
      reset,
      setIsSuccessModalOpen,
      setIsErrorModalOpen,
      setErrorMessage,
      setSuccessMessage,
      newModify,
      idSelect,
      setItems,
      setIdSelect,
      setValue,
      setNewModify,
      setIsLoading
    );

  return (
    <div
      className={`mt-16 mr-4  
  ${isMenuVisible ? "ml-72" : "ml-4"}`}
    >
      <div
        className=" md:mt-14 rounded-lg shadow  
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff] p-5"
      >
        <Loading isLoading={isLoading} />
        <form className="" onSubmit={handleSubmit(onSubmit)} method="POST">
          <TableGrupo
            items={items}
            handleClickRemove={handleClickRemove}
            handleClickUpdate={handleClickUpdate}
          />
          <div className="mb-4 mt-4">
            <label
              htmlFor="user"
              className="block mb-2 text-sm font-medium 
                    text-gray-900 dark:text-gray-300"
            >
              Grupo
            </label>
            <div className="flex space-x-2 ">
              {newModify === false && (
                <Image
                  onClick={() => handleClickNew()}
                  className="dark:filter dark:invert dark:opacity-75 opacity-40 
                                filter-none w-auto h-7"
                  src="/add.svg"
                  alt="add"
                  width={28}
                  height={28}
                />
              )}
              {<></>}
              <input
                type="text"
                id="text-grupo"
                className="bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                                 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-blue-500 
                                  dark:focus:border-blue-500"
                placeholder=""
                {...register("grupo", {
                  required: "Grupo es requerido",
                  maxLength: {
                    value: 5,
                    message: "Grupo no puede tener más de 5 caracteres",
                  },
                  minLength: {
                    value: 1,
                    message: "Grupo no puede estar vacío",
                  },
                })}
              />
            </div>
            {errors.grupo && (
              <ErrorMessageInput message={errors.grupo.message + ""} />
            )}
          </div>
          <button
            type="submit"
            className="w-full text-white bg-[#438e96] hover:bg-[#3b757f] 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                          dark:bg-[#438e96] dark:hover:bg-[#3b757f] 
                           dark:focus:ring-blue-800   "
          >
            Guardar
          </button>

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
        </form>
      </div>
    </div>
  );
}
