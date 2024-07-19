"use cliente";
import {
  ItemStudentParticipacion,
} from "@/app/types/types";
import { v4 as uuidv4 } from "uuid";

type Props = {
 
  readonly alumnos: ItemStudentParticipacion[];
 
};

export default function TableAlumnosParticipacion({
  alumnos
}: Props) {
  return (
    <>
      {alumnos.length !== 0 && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3 mr-3 w-full max-w-4xl mx-auto">
          <div
            className="flex items-center justify-between flex-column flex-wrap md:flex-row 
                          space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900"
          ></div>
          <table
            className="w-full text-sm text-left rtl:text-right text-gray-500
                          dark:text-gray-400"
          >
            <thead
              className="border-b text-xs uppercase  
                              dark:bg-[#2d464c] bg-gray-50 dark:text-gray-300 text-black"
            >
              <tr>
                <th scope="col" className="px-6 py-3 w-1/6">
                  No. lista
                </th>
                <th scope="col" className="px-6 py-3 w-2/3">
                  Nombres
                </th>
                <th scope="col" className="px-6 py-3 w-1/6">
                  Calificacion
                </th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno, index) =>
                alumno !== undefined ? (
                  <tr
                    key={uuidv4()}
                    className="border-b dark:bg-[#1a2c32] bg-[#ffffff]
                                      dark:border-gray-700 hover:bg-[#e6e6e6]
                                       dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 w-1/6">
                      <div className="flex items-center">{alumno.noLista}</div>
                    </td>
                    <td className="px-6 py-4 w-2/3">
                      <div>
                        <div className="text-base font-semibold">
                          {alumno.nombre}
                        </div>
                        <div className="font-normal text-gray-500">
                          {alumno.apellidoPaterno} {alumno.apellidoMaterno}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 w-1/6">{alumno.calificacion}</td>
                  </tr>
                ) : (
                  <div key={uuidv4()} className=" items-center text-justify justify-center">
                    No existen datos
                  </div>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
