import React from "react";
import { SvgIcons } from "../svg/SvgIcons";

interface InfoCardProps {
  grado: string | undefined;
  grupo: string | undefined;
  materia: string | undefined;
  dateFormatStr?: string | null;
  noPeriodo?: string;
}

const InfoCardDateGGM: React.FC<InfoCardProps> = ({
  grado,
  grupo,
  materia,
  dateFormatStr,
  noPeriodo,
}) => {
  return (
    <div
      className="w-full max-w-md overflow-hidden rounded-lg shadow-md 
    transition-shadow duration-300 hover:shadow-lg dark:bg-[#1a2c32] bg-white"
    >
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { label: "Grado", value: grado },
            { label: "Grupo", value: grupo },
            { label: "Materia", value: materia },
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
        {dateFormatStr && (
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <SvgIcons.Calendar />
            <span>Fecha: {dateFormatStr}</span>
          </div>
        )}
        {noPeriodo && (
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <SvgIcons.Document />
            <span>Periodo: {noPeriodo}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCardDateGGM;
