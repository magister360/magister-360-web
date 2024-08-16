import {
  calcularEncuadreExamen,
  sumCalificacionExamen,
} from "@/app/calificacion/CalificacionExamen";
import { TypeExamenCalificacion } from "@/app/types/examen/TypeExamen";
import React from "react";

interface InfoCardProps {
  examenes: TypeExamenCalificacion[];
  valueExamen: number;
}

const InfoCardExamen: React.FC<InfoCardProps> = ({ examenes, valueExamen }) => {
  let totalExamenes = 1;
  let suma = sumCalificacionExamen(examenes);
  let promedio = calcularEncuadreExamen(totalExamenes, suma, valueExamen);
  return (
    <div
      className="w-full  overflow-hidden rounded-lg shadow-md 
        transition-shadow duration-300 hover:shadow-lg dark:bg-[#1a2c32] bg-white mt-4 mr-4"
    >
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { label: "Valor encuadre calificación", value: valueExamen },

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

export default InfoCardExamen;
