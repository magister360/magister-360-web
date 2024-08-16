import React from "react";
import { v4 as uuidv4 } from "uuid";

import { TypeExamenCalificacion } from "@/app/types/examen/TypeExamen";
import InfoCardExamen from "./InfoCardExamen";

type Props = {
  readonly noPeriodo: number | undefined;
  readonly examenes: TypeExamenCalificacion[];
  readonly valueExamen: number;
};

export function getCalificacionPeriodo(
  noPeriodo: string,
  examenes: TypeExamenCalificacion[]
): number {

  const examen = examenes.find((p) => String(p.noPeriodo) === noPeriodo);
  return examen ? examen.calificacion : 0;
}

export default function TableExamen({
  noPeriodo,
  examenes,
  valueExamen,
}: Props) {

  return (
    <>
      <h3 className="mt-4 mb-2 block text-gray-700 dark:text-gray-200 font-bold text-xl  ">
        Examenes
      </h3>
      <div className=" relative overflow-x-auto shadow-md sm:rounded-lg  mt-4 ">
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
                Trimestre
              </th>
              <th scope="col" className="px-6 py-3">
                Calificacion
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              key={uuidv4()}
              className="border-b dark:bg-[#1a2c32] bg-[#ffffff] dark:border-gray-700"
            >
              <td className="px-6 py-3">
                <div className="flex items-center">{noPeriodo}</div>
              </td>
              <td
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap 
                dark:text-white"
              >
                <div className="ps-3">
                  {getCalificacionPeriodo(noPeriodo + "", examenes)}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <InfoCardExamen examenes={examenes} valueExamen={valueExamen} />
    </>
  );
}
