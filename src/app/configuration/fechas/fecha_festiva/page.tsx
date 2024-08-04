"use client";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import TableFechasFestivas from "./components/TableFechasFestivas";
import Image from "next/image";
import SubmitButton from "@/app/components/SubmitButton";
import { useState } from "react";
import { createFechaFestiva } from "./controller/FechaFestivaController";
import ErrorModal from "@/app/components/ErrorModal ";
import SuccessModal from "@/app/components/SuccessModal";
import { AuthCheck } from "@/app/hooks/AuthCheck";
import { useForm } from "react-hook-form";
import ErrorMessageInput from "@/app/components/ErrorMessageInput";
import OptionsActividades from "./components/OptionsActivdades";

export default function FechaFestiva() {
  const { isMenuVisible, idUsuario } = useSidebarContext();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  let actividades: string[] = [
    "Suspensión de labores docentes",
    "Receso de clases",
    "Consejo técnico escolar fase intensiva",
    "Consejo técnico escolar, sesión ordinaria",
    "Registro calificaciones",
    "Taller intensivo para personal docente",
    "Taller intensivo para personal con funciones de dirección"
  ];

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };
  const handleSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const onSubmit = async (data: any) => {
    const result = await createFechaFestiva(
      data.date,
      data.actividad,
      idUsuario
    );
    if (result.success) {
      setSuccessMessage(result.message);
      setIsSuccessModalOpen(true);
    } else {
      setErrorMessage(result.message);
      setIsErrorModalOpen(true);
    }
  };

  if (isErrorModalOpen) {
    return (
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    );
  }

  if (isSuccessModalOpen) {
    return (
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModal}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
      />
    );
  }
  if (idUsuario === undefined) {
    return <AuthCheck />;
  }

  return (
    <div
      className={`mt-16 mr-4  
                  ${isMenuVisible ? "ml-72" : "ml-4"}`}
    >
      <h2 className="block text-gray-700 dark:text-gray-200 font-bold text-xl pt-0 pb-4">
        Fechas festivas
      </h2>
      <div
        className="rounded-lg shadow  
        sm:max-w-full  dark:bg-[#18181B] bg-[#ffffff]  pt-2 pb-4 pr-0  "
      >
        <TableFechasFestivas />

        <div>
          <div className="flex space-x-2  items-center justify-start  mt-4 ml-4 mb-4">
            <Image
              className="dark:filter dark:invert dark:opacity-75 opacity-40 
                                filter-none w-auto h-7"
              src="/add.svg"
              alt="add"
              width={28}
              height={28}
            />

            <label
              className="block text-gray-700 dark:text-gray-200 font-bold mb-2 items-center"
              htmlFor="lbl-nuevo"
            >
              Nuevo
            </label>
          </div>
          <div className="pl-4">
            <label
              className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
              htmlFor="lbl-date-start-end"
            >
              Fecha
            </label>
            <input
              type="date"
              id="date-end"
              className="bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                                 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-blue-500 
                                  dark:focus:border-blue-500 max-w-sm"
              placeholder=""
              {...register("date", {
                required: "Fecha requerida",
              })}
            />
            {errors.date && (
              <ErrorMessageInput message={String(errors.date.message)} />
            )}

            <label
              className="block text-gray-700 dark:text-gray-200 font-bold mb-2 mt-4"
              htmlFor="lbl-date-start-end"
            >
              Actividad
            </label>
            <select
              id="select-materia"
              className="block w-full p-2 mb-6 text-sm text-gray-900 
                                    border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
                                  focus:border-blue-500 dark:bg-[#1a2c32] dark:border-gray-600
                                  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                 dark:focus:border-blue-500 max-w-sm"
              {...register("actividad", {
                required: "Actividad es requerido",
              })}
            >
              <OptionsActividades items={actividades} />
            </select>
          </div>
        </div>
        <form
          className="sm:max-w-sm mt-4 mb-4"
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
        >
          <SubmitButton
            buttonText="Guardar"
            additionalClassName="ml-4 max-w-sm"
          />
        </form>
      </div>
    </div>
  );
}
