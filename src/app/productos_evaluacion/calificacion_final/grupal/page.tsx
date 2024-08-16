"use client";
import InfoCardDateGGM from "@/app/components/InfoCardDateGGM";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import { Student } from "@/app/types/alumnos/TypeStudents";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import actionFetchGrupal from "./action/ActionFetchGrupal";
import TableAlumnoGrupal from "./components/TableAlumnoGrupal";
import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";
import useEncuadreCalificacionHook from "../../hooks/useEncuadreCalificacionHook";
import { PeriodoEvaluacion } from "@/app/types/periodos_evaluacion/TypePeriodosEvaluacion";
import usePeriodos from "@/app/hooks/usePeriodos";
import { TypeTareaCalificacion } from "@/app/types/tarea/TypeTarea";
import { TypeProyectoCalificacion } from "@/app/types/proyecto/TypeProyecto";
import { TypePuntoExtraCalificacion } from "@/app/types/puntos_extra/TypePuntoExtra";

export default function CalificacionFinalGrupal() {
  const {
    isMenuVisible,
    grado,
    grupo,
    materia,
    idGrado,
    idGrupo,
    idMateria,
    idUsuario,
  } = useSidebarContext();

  const [isLoading, setIsLoading] = useState(false);
  const [alumnos, setAlumnos] = useState<Student[] | null>(null);
  const [participaciones, setParticipaciones] = useState<
    TypeParticipacionCalificacion[] | null
  >(null);
  const [totalParticipaciones, setTotalParticipaciones] = useState<number>(0);
  const [tareas, setTareas] = useState<TypeTareaCalificacion[] | null>(null);
  const [totalTareas, setTotalTareas] = useState<number>(0);
  const [proyectos, setProyectos] = useState<TypeProyectoCalificacion[] | null>(
    null
  );
  const [totalProyectos, setTotalProyectos] = useState<number>(0);
  const [puntosExtra, setPuntosExtra] = useState<
    TypePuntoExtraCalificacion[] | null
  >(null);

  const [participacionesChecked, setParticipacionesChecked] = useState({
    isChecked: false,
    value: 0,
  });
  const [tareasChecked, setTareasChecked] = useState({
    isChecked: false,
    value: 0,
  });
  const [examenesChecked, setExamenesChecked] = useState({
    isChecked: false,
    value: 0,
  });
  const [proyectosChecked, setProyectosChecked] = useState({
    isChecked: false,
    value: 0,
  });
  const [isCheckedPuntosExtra, setIsCheckedPuntosExtra] = useState(false);
  const [isCheckedRedondear, setIsCheckedRedondear] = useState(false);
  const [id, setId] = useState<string | undefined>(undefined);
  const [periodos, setPeriodos] = useState<PeriodoEvaluacion[] | null>(null);

  usePeriodos({ setIsLoading, setPeriodos });

  useEncuadreCalificacionHook(
    setParticipacionesChecked,
    setTareasChecked,
    setExamenesChecked,
    setProyectosChecked,
    setIsCheckedPuntosExtra,
    setIsCheckedRedondear,
    setId,
    setIsLoading
  );

  const actionFetchEstadisticas = async () => {
    await actionFetchGrupal(
      idGrado,
      idGrupo,
      idMateria,
      idUsuario,
      periodos,
      setIsLoading,
      setAlumnos,
      setParticipaciones,
      setTotalParticipaciones,
      setTareas,
      setTotalTareas,
      setProyectos,
      setTotalProyectos,
      setPuntosExtra
    );
  };

  return (
    <div
      className={`mt-16 mr-4  
            ${isMenuVisible ? "ml-72" : "ml-4"}`}
    >
      <h3 className="mt-2  block text-gray-700 dark:text-gray-200 font-bold text-xl mb-2">
        Calificación final grupal
      </h3>
      <div className="mb-4">
        <InfoCardDateGGM grado={grado} grupo={grupo} materia={materia} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          key={uuidv4()}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4
          relative overflow-hidden pb-16 cursor-default"
        >
          <div className="pl-3">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-blue-500 rounded-l-lg"></div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Calificación final
            </h2>
            <p className="text-gray-600 dark:text-gray-400"></p>
            <p className="text-gray-600 dark:text-gray-400"></p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 
            px-4 rounded shadow-md transition duration-300 
            ease-in-out transform hover:-translate-y-1"
              onClick={() => actionFetchEstadisticas()}
            >
              Detalles
            </button>
          </div>
        </div>
      </div>
      {alumnos !== null && alumnos?.length >= 0 && (
        <div>
          <TableAlumnoGrupal
            alumnos={alumnos}
            participaciones={participaciones}
            totalParticipaciones={totalParticipaciones}
            participacionesChecked={participacionesChecked}
            tareas={tareas}
            totalTareas={totalTareas}
            tareasChecked={tareasChecked}
            proyectos={proyectos}
            totalProyectos={totalProyectos}
            proyectosChecked={proyectosChecked}
            puntosExtra={puntosExtra}
            isCheckedPuntosExtra={isCheckedPuntosExtra}
          />
        </div>
      )}
    </div>
  );
}
