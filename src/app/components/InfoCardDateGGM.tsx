import React from "react";

interface InfoCardProps {
  grado: string | undefined;
  grupo: string | undefined;
  materia: string | undefined;
  dateFormatStr: string | null;
}

const InfoCardDateGGM: React.FC<InfoCardProps> = ({
  grado,
  grupo,
  materia,
  dateFormatStr,
}) => {
  return (
    <div className="mr-4 pt-4 pb-4 pl-4 pr-4 rounded-lg shadow sm:max-w-md dark:bg-[#18181B] bg-[#ffffff] relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#93c8cd] dark:bg-[#1a2c32]"></div>
      <div className="flex space-x-2">
        <div className="px-5 py-2.5 rounded-lg dark:bg-[#1a2c32] bg-[#93c8cd]">
          <label
            className="block text-gray-700 dark:text-gray-200 font-bold text-md mb-2"
            htmlFor="lbl-grado"
          >
            Grado: <span className="font-normal text-sm">{grado}</span>
          </label>
        </div>

        <div className="px-5 py-2.5 rounded-lg dark:bg-[#1a2c32] bg-[#93c8cd]">
          <label
            className="block text-gray-700 dark:text-gray-200 font-bold text-md mb-2"
            htmlFor="lbl-grupo"
          >
            Grupo: <span className="font-normal text-sm">{grupo}</span>
          </label>
        </div>

        <div className="px-5 py-2.5 rounded-lg dark:bg-[#1a2c32] bg-[#93c8cd]">
          <label
            className="block text-gray-700 dark:text-gray-200 font-bold text-md mb-2"
            htmlFor="lbl-materia"
          >
            Materia: <span className="font-normal text-sm">{materia}</span>
          </label>
        </div>
      </div>
      <label
        className="md:mt-2 block text-gray-700 dark:text-gray-200 font-bold text-sm mb-2"
        htmlFor="lbl-date"
      >
        Fecha: <span className="font-normal text-sm">{dateFormatStr}</span>
      </label>
    </div>
  );
};

export default InfoCardDateGGM;