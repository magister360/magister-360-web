"use client";
import ErrorMessageInput from "@/app/components/ErrorMessageInput";
import SubmitButton from "@/app/components/SubmitButton";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import { DateFormats, formatDate } from "@/app/utils/DateUtils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SeleccionFecha() {
  const router = useRouter();
  const { isMenuVisible } = useSidebarContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const date = new Date();
    const format = formatDate(date, DateFormats.ISO);
    setValue("date", format);
    setValue("orderStudents", "desc");
  }, [setValue]);

  const validateDate = (value: string) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return selectedDate <= currentDate || "fecha incorrecta";
  };

  const onSubmit = (data: any) => {
    const params = new URLSearchParams({
      date: data.date,
      orderStudents: data.orderStudents,
    });
    let route = "/organizacion_grupos/actividades/asistencia";
    router.push(`${route}?${params.toString()}`);
  };

  return (
    <div
      className={`mt-16 mr-4
    ${isMenuVisible ? "ml-72" : "ml-4"}`}
    >
      <form className=" " onSubmit={handleSubmit(onSubmit)}>
        <h2 className="md:mt-14 block text-gray-700 dark:text-gray-200 font-bold text-xl mb-2">
          Asistencias
        </h2>

        <div
          className="md:mt-2 pt-2 pb-4 pl-4 pr-4  rounded-lg shadow  
                 sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]"
        >
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
              required: "Fecha requerida",
              validate: validateDate,
            })}
          />

          {errors.date && (
            <ErrorMessageInput message={String(errors.date.message)} />
          )}
          <label
            className="block text-gray-700 dark:text-gray-200 font-bold mb-2 mt-2"
            htmlFor="lbl-orden-alumnos"
          >
            Orden mostrar alumnos
          </label>

          <div>
            <div className="flex items-center mb-4">
              <input
                id="ascending-radio"
                type="radio"
                value="asc"
                {...register("orderStudents")}
                className="w-6 h-6 text-blue-600 bg-gray-100 
                         border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                         dark:ring-offset-blue-700 focus:ring-2 dark:bg-blue-700 
                         dark:border-blue-700 cursor-pointer"
              />
              <label
                htmlFor="ascending-radio"
                className="ms-3 text-sm
                             font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                Ascendente
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="descending-radio"
                type="radio"
                value="desc"
                {...register("orderStudents")}
                className="w-6 h-6 text-blue-600 bg-gray-100 
                        border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                        dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 
                        dark:border-gray-600 cursor-pointer"
              />
              <label
                htmlFor="descending-radio"
                className="ms-3 text-sm font-medium 
                            text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                Descendente
              </label>
            </div>
          </div>

          <div className="mt-4 mb-4 w-full">
            <SubmitButton buttonText="Continuar" />
          </div>
        </div>
      </form>
    </div>
  );
}
