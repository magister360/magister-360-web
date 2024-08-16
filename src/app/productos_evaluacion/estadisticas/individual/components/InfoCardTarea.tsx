import {
  calcularEncuadreTarea,
  sumCalificacionTarea,
} from "@/app/calificacion/CalificacionTarea";
import { TypeTareaCalificacion } from "@/app/types/tarea/TypeTarea";
import React from "react";

interface InfoCardProps {
  countTareas: number;
  totalTareas: number;
  tareas: TypeTareaCalificacion[];
  valueTarea: number;
}

const InfoCardTarea: React.FC<InfoCardProps> = ({
  countTareas,
  totalTareas,
  tareas,
  valueTarea,
}) => {
  let suma = sumCalificacionTarea(tareas);
  let promedio = calcularEncuadreTarea(totalTareas, suma, valueTarea);
  return (
    <div
      className="w-full  overflow-hidden rounded-lg shadow-md 
      transition-shadow duration-300 hover:shadow-lg dark:bg-[#1a2c32] bg-white mt-4"
    >
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { label: "Valor encuadre calificación", value: valueTarea },
            { label: "Contar tareas", value: countTareas },
            { label: "Total tareas", value: totalTareas },
            { label: "Suma", value: suma },
            { label: "Promedio", value: promedio.toFixed(2) },
          ].map(({ label, value }) => (
            <span
              key={label}
              className="px-3 py-1 text-sm font-medium rounded-full 
              bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {label}: {value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoCardTarea;
