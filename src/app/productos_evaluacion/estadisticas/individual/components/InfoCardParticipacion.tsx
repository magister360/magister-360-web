import {
  calcularEncuadreParticipacion,
  sumCalificacionParticipacion,
} from "@/app/calificacion/CalificacionParticipacion";
import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";
import React from "react";

interface InfoCardProps {
  countParticipaciones: number;
  totalParticipaciones: number;
  participaciones: TypeParticipacionCalificacion[];
  valueParticipacion: number;
}

const InfoCardParticipacion: React.FC<InfoCardProps> = ({
  countParticipaciones,
  totalParticipaciones,
  participaciones,
  valueParticipacion,
}) => {
  let suma = sumCalificacionParticipacion(participaciones);
  let promedio = calcularEncuadreParticipacion(
    totalParticipaciones,
    suma,
    valueParticipacion
  );
  return (
    <div
      className="w-full  overflow-hidden rounded-lg shadow-md 
    transition-shadow duration-300 hover:shadow-lg dark:bg-[#1a2c32] bg-white mt-4"
    >
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { label: "Valor encuadre calificación", value: valueParticipacion },
           { label: "Contar participaciones", value: countParticipaciones },
            { label: "Total participaciones", value: totalParticipaciones },
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

export default InfoCardParticipacion;
