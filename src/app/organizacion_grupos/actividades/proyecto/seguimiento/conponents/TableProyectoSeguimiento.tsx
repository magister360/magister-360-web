import { PeriodoEvaluacion } from "@/app/types/periodos_evaluacion/TypePeriodosEvaluacion";
import { StudentProyecto } from "@/app/types/proyecto/TypeProyecto";

import React from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  readonly alumnos: StudentProyecto[];
  readonly setSelectAlumno: (alumno: StudentProyecto | undefined) => void;
  readonly setFechasProyectos: React.Dispatch<
    React.SetStateAction<string[] | null>
  >;
  readonly setSelectPeriodo: React.Dispatch<
  React.SetStateAction<PeriodoEvaluacion | null>
>;
};

export default function TableProyectoSeguimiento({
  alumnos,
  setSelectAlumno,
  setFechasProyectos,
  setSelectPeriodo
}: Props) {
  const handleSelectAlumno = (alumno: StudentProyecto) => {
    setSelectAlumno(alumno);
    setFechasProyectos(null);
    setSelectPeriodo(null)
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg  mt-4 mr-3">
      <div
        className="flex items-center justify-between flex-column flex-wrap md:flex-row 
      space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900"
      ></div>
      <table
        className="w-full text-sm text-left rtl:text-right text-gray-500
                        dark:text-gray-400"
      >
        <thead
          className="border-b text-xs  uppercase  
                            dark:bg-[#2d464c] bg-gray-50  dark:text-gray-300 text-black"
        >
          <tr>
            <th scope="col" className="px-6 py-3">
              No. lista
            </th>
            <th scope="col" className="px-6 py-3">
              Nombres
            </th>

            <th scope="col" className="px-6 py-3 min-w-[20px]">
              Seleccionar
            </th>
          </tr>
        </thead>

        <tbody>
          {alumnos.map((alumno) => (
            <tr
              key={uuidv4()}
              className="border-b dark:bg-[#1a2c32] bg-[#ffffff] dark:border-gray-700"
            >
              <td className="px-6 py-3">
                <div className="flex items-center">{alumno.noLista}</div>
              </td>
              <td
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap 
                dark:text-white"
              >
                <div className="ps-3">
                  <div className="text-base font-semibold">{alumno.nombre}</div>
                  <div className="font-normal text-gray-500">
                    {alumno.apellidoPaterno} {alumno.apellidoMaterno}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 min-w-[20px]">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold 
                py-2 px-4 rounded"
                  onClick={() => handleSelectAlumno(alumno)}
                >
                  Seleccionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
