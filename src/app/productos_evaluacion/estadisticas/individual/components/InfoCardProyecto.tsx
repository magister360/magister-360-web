import {
  calcularEncuadreProyecto,
  sumCalificacionProyecto,
} from "@/app/calificacion/CalficacionProyecto";
import { TypeProyectoCalificacion } from "@/app/types/proyecto/TypeProyecto";
import React from "react";

interface InfoCardProps {
  countProyectos: number;
  totalProyectos: number;
  proyectos: TypeProyectoCalificacion[];
  valueProyecto: number;
}

const InfoCardProyecto: React.FC<InfoCardProps> = ({
  countProyectos,
  totalProyectos,
  proyectos,
  valueProyecto,
}) => {
  let suma = sumCalificacionProyecto(proyectos);
  let promedio = calcularEncuadreProyecto(totalProyectos, suma, valueProyecto);
  return (
    <div
      className="w-full  overflow-hidden rounded-lg shadow-md 
        transition-shadow duration-300 hover:shadow-lg dark:bg-[#1a2c32] bg-white mt-4"
    >
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { label: "Valor encuadre calificación", value: valueProyecto },
            { label: "Contar proyectos", value: countProyectos },
            { label: "Total proyectos", value: totalProyectos },
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

export default InfoCardProyecto;
