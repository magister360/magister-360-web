import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import InfoCardParticipacion from "./InfoCardParticipacion";

type Props = {
  readonly fechas: string[];
  readonly participaciones: TypeParticipacionCalificacion[];
  readonly valueParticipacion: number;
};

export function getCalificacionFecha(
  fecha: string,
  participaciones: TypeParticipacionCalificacion[]
): number {
  const participacion = participaciones.find((p) => p.fecha === fecha);
  return participacion ? participacion.calificacion : 0;
}

export default function TableParticipacion({
  fechas,
  participaciones,
  valueParticipacion,
}: Props) {
  if (fechas.length === 0) {
    return null;
  }

  return (
    <>
      <h3 className="mt-4 mb-2 block text-gray-700 dark:text-gray-200 font-bold text-xl  ">
        Participaciones
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
                Fecha
              </th>
              <th scope="col" className="px-6 py-3">
                Calificacion
              </th>
            </tr>
          </thead>

          <tbody>
            {fechas.map((fecha) => (
              <tr
                key={uuidv4()}
                className="border-b dark:bg-[#1a2c32] bg-[#ffffff] dark:border-gray-700"
              >
                <td className="px-6 py-3">
                  <div className="flex items-center">{fecha}</div>
                </td>
                <td
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap 
                dark:text-white"
                >
                  <div className="ps-3">
                    {getCalificacionFecha(fecha, participaciones)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InfoCardParticipacion
        countParticipaciones={participaciones.length}
        totalParticipaciones={fechas.length}
        
        participaciones={participaciones}
        valueParticipacion={valueParticipacion}
      />
    </>
  );
}
