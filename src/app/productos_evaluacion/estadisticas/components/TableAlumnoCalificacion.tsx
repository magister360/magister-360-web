import { Student } from "@/app/types/alumnos/TypeStudents";
import { v4 as uuidv4 } from "uuid";
import calculateParticipacion from "../../../calificacion/CalificacionParticipacion";
import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";
import calculateTarea from "../../../calificacion/CalificacionTarea";
import { TypeTareaCalificacion } from "@/app/types/tarea/TypeTarea";
import { TypeProyectoCalificacion } from "@/app/types/proyecto/TypeProyecto";
import calculateProyecto from "../../../calificacion/CalficacionProyecto";
import { TypeExamenCalificacion } from "@/app/types/examen/TypeExamen";
import calculateExamen from "../../../calificacion/CalificacionExamen";
import { TypePuntoExtraCalificacion } from "@/app/types/puntos_extra/TypePuntoExtra";
import calculatePuntoExtra from "../../../calificacion/CalificacionPuntoExtra";
import calculateCalificacionFinal from "@/app/calificacion/CalificacionFinal";

type Props = {
  readonly alumnos: Student[] | null;
  readonly participaciones: TypeParticipacionCalificacion[] | null;
  readonly totalParticipaciones: number;
  readonly participacionesChecked: {
    isChecked: boolean;
    value: number;
  };
  readonly tareas: TypeTareaCalificacion[] | null;
  readonly totalTareas: number;
  readonly tareasChecked: {
    isChecked: boolean;
    value: number;
  };
  readonly proyectos: TypeProyectoCalificacion[] | null;
  readonly totalProyectos: number;
  readonly proyectosChecked: {
    isChecked: boolean;
    value: number;
  };
  readonly examenes: TypeExamenCalificacion[] | null;

  readonly examenesChecked: {
    isChecked: boolean;
    value: number;
  };
  readonly puntosExtra: TypePuntoExtraCalificacion[] | null;

  readonly isCheckedPuntosExtra: boolean;
};

export default function TableAlumnoCalificacion({
  alumnos,
  participaciones,
  totalParticipaciones,
  participacionesChecked,
  tareas,
  totalTareas,
  tareasChecked,
  proyectos,
  totalProyectos,
  proyectosChecked,
  examenes,
  examenesChecked,
  puntosExtra,
  isCheckedPuntosExtra,
}: Props) {
  let totalExamenes = 1;
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg  mt-4 mr-3 mb-14">
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
            {participacionesChecked.isChecked && (
              <th scope="col" className="px-6 py-3 min-w-[15px]">
                Participación
              </th>
            )}
            {tareasChecked.isChecked && (
              <th scope="col" className="px-6 py-3 min-w-[15px]">
                Tarea
              </th>
            )}
            {proyectosChecked.isChecked && (
              <th scope="col" className="px-6 py-3 min-w-[15px]">
                Proyecto
              </th>
            )}
            {examenesChecked.isChecked && (
              <th scope="col" className="px-6 py-3 min-w-[15px]">
                Examen
              </th>
            )}
            {isCheckedPuntosExtra && (
              <th scope="col" className="px-6 py-3 min-w-[15px]">
                Punto extra
              </th>
            )}
            {isCheckedPuntosExtra && (
              <th scope="col" className="px-6 py-3 min-w-[15px]">
                Promedio final
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {alumnos?.map((alumno) => (
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
              {participacionesChecked.isChecked && (
                <td className="px-6 py-4 min-w-[20px] font-bold dark:text-white">
                  {calculateParticipacion({
                    participaciones: participaciones,
                    totalParticipaciones: totalParticipaciones,
                    noLista: alumno.noLista,
                    participacionesChecked: participacionesChecked,
                  }).toFixed(2)}
                </td>
              )}
              {tareasChecked.isChecked && (
                <td className="px-6 py-4 min-w-[20px] font-bold dark:text-white">
                  {calculateTarea({
                    tareas: tareas,
                    totalTareas: totalTareas,
                    noLista: alumno.noLista,
                    tareasChecked: tareasChecked,
                  }).toFixed(2)}
                </td>
              )}
              {proyectosChecked.isChecked && (
                <td className="px-6 py-4 min-w-[20px] font-bold dark:text-white">
                  {calculateProyecto({
                    proyectos: proyectos,
                    totalProyectos: totalProyectos,
                    noLista: alumno.noLista,
                    proyectosChecked: proyectosChecked,
                  }).toFixed(2)}
                </td>
              )}
              {examenesChecked.isChecked && (
                <td className="px-6 py-4 min-w-[20px] font-bold dark:text-white">
                  {calculateExamen({
                    examenes: examenes,
                    totalExamenes: totalExamenes,
                    noLista: alumno.noLista,
                    examenesChecked: examenesChecked,
                  }).toFixed(2)}
                </td>
              )}
              {isCheckedPuntosExtra && (
                <td className="px-6 py-4 min-w-[20px] font-bold dark:text-white">
                  {calculatePuntoExtra({
                    puntosExtra: puntosExtra,

                    noLista: alumno.noLista,
                    isCheckedPuntosExtra: isCheckedPuntosExtra,
                  }).toFixed(2)}
                </td>
              )}
              {isCheckedPuntosExtra && (
                <td className="px-6 py-4 min-w-[20px] font-bold dark:text-white">
                  {calculateCalificacionFinal({
                    noLista: alumno.noLista,
                    proyectos,
                    totalProyectos,
                    proyectosChecked,
                    participaciones,
                    totalParticipaciones,
                    participacionesChecked,
                    tareas,
                    totalTareas,
                    tareasChecked,
                    examenes,
                    totalExamenes,
                    examenesChecked,
                    puntosExtra,
                    isCheckedPuntosExtra,
                  }).toFixed(2)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
