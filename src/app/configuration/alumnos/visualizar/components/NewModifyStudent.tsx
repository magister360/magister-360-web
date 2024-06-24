import Image from "next/image";
import { useForm, Controller } from "react-hook-form";

import { TypeStatusAlumno } from "@/app/utils/TypeStatusAlumno";
import { ChangeEvent, useEffect, useState } from "react";
import ErrorMessageInput from "@/app/components/ErrorMessageInput";
import { StudentType } from "@/app/types/types";
import { NewModifyStudentHook } from "../hooks/NewModifyStudentHook";
import ImagePhoto from "./ImagePhoto";

type NewModifyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
  studentSelect: StudentType | undefined;
  idGrado: number;
  idGrupo: number;
};

const IMAGE_DEFECTO = "/notPhoto.png";

export const NewModifyStudent: React.FC<NewModifyModalProps> = ({
  isOpen,
  onClose,
  errorMessage,
  studentSelect,
  idGrado,
  idGrupo,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    control,
  } = useForm();
  const [imageSrcPhoto, setImageSrcPhoto] = useState(IMAGE_DEFECTO);

  const { getStatusText, handleImageChange, onSubmit } = NewModifyStudentHook(
    setValue,
    reset,
    studentSelect,
    isOpen,
    setImageSrcPhoto,
    IMAGE_DEFECTO,

    idGrado,
    idGrupo
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70 
        transition-opacity duration-300  overflow-y-auto pt-10 ${
          isOpen ? "visible" : "hidden"
        }`}
    >
      <div
        className="rounded-lg shadow  
                    sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  p-5 mt-4 relative
                      max-h-[90vh] overflow-y-auto flex flex-col"
      >
        <div className="flex justify-between items-start">
          <Image
            className=" absolute right-0 m-4 cursor-pointer dark:filter dark:invert opacity-40 filter-none"
            src="/close_32.png"
            alt="close"
            width={32}
            height={32}
            priority
            onClick={onClose}
          />
        </div>
        <div>
          <label
            htmlFor="lbl-no-lista"
            className="block mb-2 text-sm font-medium 
                    text-gray-900 dark:text-white"
          >
            No lista
          </label>
          <input
            disabled
            type="text"
            id="text-no-lista"
            value={watch("no_lista") || studentSelect?.noLista || ""}
            className="bg-gray-50 border border-gray-300 
                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                           focus:border-primary-600 block max-w-sm p-2.5 dark:bg-[#1a2c32]
                           dark:border-gray-600 dark:placeholder-gray-400
                           dark:text-white dark:focus:ring-blue-500 
                           dark:focus:border-blue-500 "
            placeholder=""
          />
          {errors.no_lista && (
            <ErrorMessageInput message={errors.no_lista.message + ""} />
          )}
        </div>
        <div className="mt-2">
          <label
            htmlFor="lbl-nombre"
            className="block mb-2 text-sm font-medium 
                    text-gray-900 dark:text-white"
          >
            Nombre
          </label>
          <input
            type="text"
            id="text-nombre"
            defaultValue={studentSelect?.nombre || ""}
            className="bg-gray-50 border border-gray-300 
                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                           focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                           dark:border-gray-600 dark:placeholder-gray-400
                           dark:text-white dark:focus:ring-blue-500 
                           dark:focus:border-blue-500"
            placeholder=""
            {...register("nombre", {
              required: "Nombre es requerido",
              maxLength: {
                value: 20,
                message: "Nombre no puede tener más de 20 caracteres",
              },
            })}
          />
          {errors.nombre && (
            <ErrorMessageInput message={errors.nombre.message + ""} />
          )}
        </div>
        <div className="mt-2">
          <label
            htmlFor="lbl-a-p"
            className="block mb-2 text-sm font-medium 
                    text-gray-900 dark:text-white"
          >
            Apellido paterno
          </label>
          <input
            type="text"
            id="text-a-p"
            defaultValue={studentSelect?.apellidoPaterno || ""}
            className="bg-gray-50 border border-gray-300 
                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                           focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                           dark:border-gray-600 dark:placeholder-gray-400
                           dark:text-white dark:focus:ring-blue-500 
                           dark:focus:border-blue-500"
            placeholder=""
            {...register("apellidoPaterno", {
              required: "Apellido paterno es requerido",
              maxLength: {
                value: 20,
                message: "Apellido paterno no puede tener más de 20 caracteres",
              },
              minLength: {
                value: 1,
                message: "Apellido paterno no puede estar vacío",
              },
            })}
          />
          {errors.apellidoPaterno && (
            <ErrorMessageInput message={errors.apellidoPaterno.message + ""} />
          )}
        </div>

        <div className="mt-2">
          <label
            htmlFor="lbl-a-m"
            className="block mb-2 text-sm font-medium 
                    text-gray-900 dark:text-white"
          >
            Apellido materno
          </label>
          <input
            type="text"
            id="text-a-m"
            defaultValue={studentSelect?.apellidoMaterno || ""}
            className="bg-gray-50 border border-gray-300 
                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                           focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                           dark:border-gray-600 dark:placeholder-gray-400
                           dark:text-white dark:focus:ring-blue-500 
                           dark:focus:border-blue-500"
            placeholder=""
            {...register("apellidoMaterno", {
              maxLength: {
                value: 20,
                message: "Apellido materno no puede tener más de 20 caracteres",
              },
            })}
          />
          {errors.apellidomaterno && (
            <ErrorMessageInput message={errors.apellidomaterno.message + ""} />
          )}
        </div>
        <div className="mt-2">
          <label
            htmlFor="lbl-a-m"
            className="block mb-2 text-sm font-medium 
                    text-gray-900 dark:text-white"
          >
            Estatus
          </label>
          <div className="flex space-x-3">
            <Controller
              name="estatus"
              control={control}
              render={({ field }) => (
                <div className="flex space-x-3">
                  {[
                    TypeStatusAlumno.ALTA,
                    TypeStatusAlumno.BAJA,
                    TypeStatusAlumno.CAMBIO,
                  ].map((status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="radio"
                        {...field}
                        value={status}
                        checked={field.value === status}
                        onChange={() => field.onChange(status)}
                        className="custom-radio"
                      />
                      <span className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">
                        
                        {getStatusText(status)}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            />
          </div>
          <div className="mt-2 max-w-full ">
            <label
              htmlFor="lbl-no-lista"
              className="block mb-2 text-sm font-medium 
                    text-gray-900 dark:text-white"
            >
              Foto
            </label>
            <div className="mb-4">
              <input
                type="file"
                id="text-file"
                className="w-full bg-gray-50 border border-gray-300 
                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                           focus:border-primary-600 block p-2.5 dark:bg-[#1a2c32]
                           dark:border-gray-600 dark:placeholder-gray-400
                           dark:text-white dark:focus:ring-blue-500 
                           dark:focus:border-blue-500 "
                placeholder=""
                onChange={handleImageChange}
              />
            </div>

            <ImagePhoto
              studentFoto={studentSelect}
              imageSrcPhoto={imageSrcPhoto}
              setImageSrcPhoto={setImageSrcPhoto}
            />
          </div>
          <form className=" " onSubmit={handleSubmit(onSubmit)} method="POST">
            <button
              type="submit"
              className="w-full text-white bg-[#438e96] hover:bg-[#3b757f] 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                          dark:bg-[#438e96] dark:hover:bg-[#3b757f] 
                           dark:focus:ring-blue-800 mt-2 "
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
