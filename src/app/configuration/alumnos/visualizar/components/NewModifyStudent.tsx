import Image from "next/image";
import { useForm } from "react-hook-form";
import StatusAlumno from "../../components/StatusAlumno";
import { TypeStatusAlumno } from "@/app/utils/TypeStatusAlumno";

export default function NewModifyStudent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  return (
    <div
      className="rounded-lg shadow  
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  p-5 mt-4"
    >
      <div>
        <label
          htmlFor="lbl-no-lista"
          className="block mb-2 text-sm font-medium 
                    text-gray-900 dark:text-white"
        >
          No lista
        </label>
        <input
          type="text"
          id="text-no-lista"
          className="bg-gray-50 border border-gray-300 
                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                           focus:border-primary-600 block max-w-sm p-2.5 dark:bg-[#1a2c32]
                           dark:border-gray-600 dark:placeholder-gray-400
                           dark:text-white dark:focus:ring-blue-500 
                           dark:focus:border-blue-500 "
          {...register("no_lista", {
            required: "Número de lista es requerido",
            maxLength: {
              value: 2,
              message: "Número de lista no puede tener más de 2 caracteres",
            },
            minLength: {
              value: 1,
              message: "Número de lista no puede estar vacío",
            },
          })}
          placeholder=""
        />
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
          className="bg-gray-50 border border-gray-300 
                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                           focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                           dark:border-gray-600 dark:placeholder-gray-400
                           dark:text-white dark:focus:ring-blue-500 
                           dark:focus:border-blue-500"
          placeholder=""
          {...register("apellidomaterno", {
            required: "Apellido materno es requerido",
            maxLength: {
              value: 20,
              message: "Apellido materno no puede tener más de 20 caracteres",
            },
            minLength: {
              value: 1,
              message: "Apellido materno no puede estar vacío",
            },
          })}
        />
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
          <div className="flex items-center">
            <input
             
              id="disabled-radio-alta"
              type="radio"
              value={TypeStatusAlumno.ALTA}
              name="radio-estatus"
              className="w-4 h-4 text-blue-600 bg-gray-100 
                        border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                        dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 
                        dark:border-gray-600"
            />
            <label
              htmlFor="disabled-radio-alta"
              className="ms-2 text-sm font-medium 
                            text-gray-400 dark:text-gray-500"
            >
              Alta
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="disabled-radio-alta"
              type="radio"
              value={TypeStatusAlumno.BAJA}
              name="radio-estatus"
              className="w-4 h-4 text-blue-600 bg-gray-100 
                        border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                        dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 
                        dark:border-gray-600"
            />
            <label
              htmlFor="disabled-radio-alta"
              className="ms-2 text-sm font-medium 
                            text-gray-400 dark:text-gray-500"
            >
              Baja
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="disabled-radio-alta"
              type="radio"
              value={TypeStatusAlumno.CAMBIO}
              name="radio-estatus"
              className="w-4 h-4 text-blue-600 bg-gray-100 
                        border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                        dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 
                        dark:border-gray-600"
            />
            <label
              htmlFor="disabled-radio-alta"
              className="ms-2 text-sm font-medium 
                            text-gray-400 dark:text-gray-500"
            >
              Cambio
            </label>
          </div>
        </div>
        <div className="mt-2 max-w-full">
          <label
            htmlFor="lbl-no-lista"
            className="block mb-2 text-sm font-medium 
                    text-gray-900 dark:text-white"
          >
            Foto
          </label>

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
          />

          <div className="flex justify-center mt-2">
            <Image
              className="object-cover"
              src="/notPhoto.png"
              alt="editar"
              width={100}
              height={100}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
