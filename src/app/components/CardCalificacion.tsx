import React from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

interface CardCalificacionProps {
  index: number;
  fecha: string;
  buscarCalificacion: (fecha: string) => number;
  handleConfirmOpen: (fecha: string) => void;
  handleEditClick: (fecha: string, calificacion: number) => void;
  title: string;
  titleDatePeriod: string;
}

const CardCalificacion: React.FC<CardCalificacionProps> = ({
  index,
  fecha,
  buscarCalificacion,
  handleConfirmOpen,
  handleEditClick,
  title,
  titleDatePeriod,
}) => {
  return (
    <div
      key={uuidv4()}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex"
    >
      <div className="w-1 bg-blue-500 flex-shrink-0"></div>
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 cursor-default">
          {title} {index + 1}
        </h3>
        <p className="">
          <span className="dark:text-gray-600 text-slate-400 cursor-default">
            {titleDatePeriod}{" "}
          </span>
          <span className="text-gray-600 dark:text-gray-300 cursor-default">
            {fecha}
          </span>
        </p>
        <p className="mt-4">
          <span className="dark:text-gray-600 text-slate-400 cursor-default">
            Calificación{" "}
          </span>
          <span className="dark:text-gray-200 text-3xl font-light cursor-default">
            {buscarCalificacion(fecha)}
          </span>
        </p>
        <div className="flex gap-6">
          <Image
            className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none mr-3t 
              cursor-pointer mt-4"
            src="/remover.svg"
            alt="remover"
            width={28}
            height={28}
            onClick={() => handleConfirmOpen(fecha)}
          />
          <Image
            className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none mr-3t 
              cursor-pointer mt-4"
            src="/editar.svg"
            alt="editar"
            width={28}
            height={28}
            onClick={() => handleEditClick(fecha, buscarCalificacion(fecha))}
          />
        </div>
      </div>
    </div>
  );
};

export default CardCalificacion;
