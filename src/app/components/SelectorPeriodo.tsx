"use client";
import OptionsPeriodos from "@/app/components/OptionsPeriodos";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import { EstatusFechaPeriodosType } from "@/app/estatus/EstatusType";
import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";
import SubmitButton from "@/app/components/SubmitButton";
import { usePeriodosHook } from "../hooks/usePeriodosHook";
import { useForm } from "react-hook-form";
import ErrorMessageInput from "./ErrorMessageInput";
import { useRouter } from "next/navigation";

interface SelectorProps {
  route: string;
}

const SelectorPeriodo: React.FC<SelectorProps> = ({ route }) => {
  const router = useRouter();
  const { isMenuVisible, idUsuario } = useSidebarContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const { periodos } = usePeriodosHook(
    idUsuario,
    EstatusFechaPeriodosType.OK,
    setLoading
  );

  useEffect(() => {
    if (periodos && periodos.length > 0) {
      setValue("periodo", periodos[0].noPeriodo);
    }
  }, [periodos, setValue]);

  const onSubmit = async (data: any) => {
    
    const params = new URLSearchParams({ periodo: watch("periodo") });

    router.push(`${route}?${params.toString()}`);
  };

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  return (
    <div
      className={`mt-16 mr-4
    ${isMenuVisible ? "ml-72" : "ml-4"}`}
    >
      <form className=" " onSubmit={handleSubmit(onSubmit)} method="POST">
        <h2
          className=" md:mt-14 block text-gray-700 dark:text-gray-200 
            font-bold text-xl mb-2"
        >
          Selección de trimestre
        </h2>
        <div
          className="md:mt-2 pt-2 pb-4 pl-4 pr-4  rounded-lg shadow  
                 sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]"
        >
          <label
            className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
            htmlFor="lbl-date-start-end"
          >
            Trimestre
          </label>
          <select
            id="select-periodo"
            className="bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                                 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-gray-500 
                                  dark:focus:border-gray-500  mt-4 "
            {...register("periodo", {
              required: "Periodo requerido",
            })}
            onChange={(e) => setValue("periodo", e.target.value)}
          >
            <OptionsPeriodos itemPeriodos={periodos} />
          </select>
          {errors.periodo && (
            
            <ErrorMessageInput message={errors.periodo.message + ""} />
          )}
          <SubmitButton buttonText="Continuar" additionalClassName="mt-6" />
        </div>
      </form>
    </div>
  );
};

export default SelectorPeriodo;
