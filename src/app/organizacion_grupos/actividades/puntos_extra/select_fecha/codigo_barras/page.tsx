"use client";
import ErrorMessageInput from "@/app/components/ErrorMessageInput";
import SubmitButton from "@/app/components/SubmitButton";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import { DateFormats, formatDate } from "@/app/utils/DateUtils";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ProyectoSelectFecha() {
  const { isMenuVisible } = useSidebarContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const router = useRouter();
  const validateDate = (value: string) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return selectedDate <= currentDate || "fecha incorrecta";
  };

  const onSubmit = async (data: any) => {


    const params = new URLSearchParams({ date: watch("date") });

    router.push(
      `/organizacion_grupos/actividades/puntos_extra?${params.toString()}`
    );
  };

  useEffect(() => {
    const date = new Date();
    const format = formatDate(date, DateFormats.ISO);
    setValue("date", format);
  }, [setValue]);

  return (
    <div
      className={`mt-16 mr-4
    ${isMenuVisible ? "ml-72" : "ml-4"}`}
    >
      <form className=" " onSubmit={handleSubmit(onSubmit)} method="POST">
        <label
          className=" md:mt-14 block text-gray-700 dark:text-gray-200 
            font-bold text-xl mb-2"
          htmlFor="lbl-date-start-end"
        >
          Puntos extra
        </label>

        <div
          className="md:mt-2 pt-2 pb-4 pl-4 pr-4  rounded-lg shadow  
                 sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]"
        >
          <div>
            <label
              className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
              htmlFor="lbl-date-start-end"
            >
              Fecha
            </label>
            <input
              type="date"
              id="date-start"
              className="bg-gray-50 border border-gray-300 
                            text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                            focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                            dark:border-gray-600 dark:placeholder-gray-400
                                dark:text-white dark:focus:ring-blue-500 
                                dark:focus:border-blue-500"
              placeholder=""
              {...register("date", {
                required: "Fecha requrida",
                validate: validateDate,
              })}
            />
            {errors.date && (
              <ErrorMessageInput message={errors.date.message + ""} />
            )}
            <div className="mt-4 mb-4 w-full">
              <SubmitButton buttonText="Continuar" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
