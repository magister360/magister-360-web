import { PeriodoEvaluacion } from "@/app/types/periodos_evaluacion/TypePeriodosEvaluacion";
import { formatDateLong } from "@/app/utils/DateUtils";
import React from "react";

type Props = {
  readonly periodos: PeriodoEvaluacion[] | null;
  readonly setSelectedPeriodo: React.Dispatch<
    React.SetStateAction<PeriodoEvaluacion | null>
  >;
  readonly fetchFechasParticipacion: (
    periodoEvaluacion: PeriodoEvaluacion
  ) => Promise<void>;
};

export default function PeriodoCard({
  periodos,
  setSelectedPeriodo,
  fetchFechasParticipacion,
}: Props) {
  const handleSelectPeriodo = async (periodoEvaluacion: PeriodoEvaluacion) => {
    setSelectedPeriodo(periodoEvaluacion);
    console.log(periodoEvaluacion);
    fetchFechasParticipacion(periodoEvaluacion);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {periodos?.map((periodo) => (
        <div
          key={periodo.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer 
          relative overflow-hidden pb-16"
        >
          <div className="pl-3">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-blue-500 rounded-l-lg"></div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Trimestre {periodo.noPeriodo}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium dark:text-gray-200">
                Fecha inicial:{" "}
              </span>
              <span className="dark:text-gray-400 font-light">
                {formatDateLong(periodo.fechaInicial)}{" "}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium dark:text-gray-200">
                Fecha final:{" "}
              </span>
              <span className="dark:text-gray-400 font-light">
                {formatDateLong(periodo.fechaFinal)}
              </span>
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 
            px-4 rounded shadow-md transition duration-300 
            ease-in-out transform hover:-translate-y-1"
              onClick={() => handleSelectPeriodo(periodo)}
            >
              Detalles
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
