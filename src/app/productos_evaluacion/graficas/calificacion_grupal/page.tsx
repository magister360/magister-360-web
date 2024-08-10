"use client";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import HorizontalBarChart from "../componenets/HorizontalBarChart";
import InfoCardDateGGM from "@/app/components/InfoCardDateGGM";
import { PeriodoEvaluacion } from "@/app/types/periodos_evaluacion/TypePeriodosEvaluacion";
import { useState } from "react";
import CardPeriodo from "@/app/components/CardPeriodo";
import usePeriodos from "../../estadisticas/hooks/usePeriodos";
import Loading from "@/app/components/Loading";
import useEncuadreCalificacionHook from "../../hooks/useEncuadreCalificacionHook";
import useActionFetch from "../../actions/ActionFetch";
import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";
import { TypeProyectoCalificacion } from "@/app/types/proyecto/TypeProyecto";
import { TypeTareaCalificacion } from "@/app/types/tarea/TypeTarea";
import { TypeExamenCalificacion } from "@/app/types/examen/TypeExamen";
import { Student } from "@/app/types/alumnos/TypeStudents";
import { TypePuntoExtraCalificacion } from "@/app/types/puntos_extra/TypePuntoExtra";
import CardPeriodoTitulo from "@/app/components/CardPeriodoTitulo";

export default function GraficaCalificacionGrupal() {
  const {
    isMenuVisible,
    grado,
    grupo,
    materia,
    idUsuario,
    idGrado,
    idGrupo,
    idMateria,
  } = useSidebarContext();
  const [periodos, setPeriodos] = useState<PeriodoEvaluacion[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectPeriodo, setSelectPeriodo] = useState<PeriodoEvaluacion | null>(
    null
  );
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
  const [participaciones, setParticipaciones] = useState<
    TypeParticipacionCalificacion[] | null
  >(null);
  const [totalParticipaciones, setTotalParticipaciones] = useState<number>(0);
  const [proyectos, setProyectos] = useState<TypeProyectoCalificacion[] | null>(
    null
  );
  const [totalProyectos, setTotalProyectos] = useState<number>(0);
  const [tareas, setTareas] = useState<TypeTareaCalificacion[] | null>(null);
  const [totalTareas, setTotalTareas] = useState<number>(0);
  const [examenes, setExamenes] = useState<TypeExamenCalificacion[] | null>(
    null
  );
  const [puntosExtra, setPuntosExtra] = useState<
    TypePuntoExtraCalificacion[] | null
  >(null);
  const [alumnos, setAlumnos] = useState<Student[] | null>(null);

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

  const actionFetchEstadisticas = async (
    periodoEvaluacion: PeriodoEvaluacion | null
  ) => {
    await useActionFetch(
      idGrado,
      idGrupo,
      idMateria,
      idUsuario,
      periodoEvaluacion?.fechaInicial,
      periodoEvaluacion?.fechaFinal,
      periodoEvaluacion?.noPeriodo,
      setIsLoading,
      setParticipaciones,
      setTotalParticipaciones,
      setProyectos,
      setTotalProyectos,
      setTareas,
      setTotalTareas,
      setExamenes,
      setPuntosExtra,
      setAlumnos
    );
  };

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }
  return (
    <div
      className={`mt-16 mr-4  
            ${isMenuVisible ? "ml-72" : "ml-4"}`}
    >
      <h3 className="mt-2  block text-gray-700 dark:text-gray-200 font-bold text-xl mb-2">
        Graficas
      </h3>
      <div className="mb-4">
        <InfoCardDateGGM grado={grado} grupo={grupo} materia={materia} />
      </div>
      <div>
        <CardPeriodo
          periodos={periodos}
          setSelectedPeriodo={setSelectPeriodo}
          fetchFechas={actionFetchEstadisticas}
        />
      </div>
      {selectPeriodo && (
        <div className="mt-4">
          <CardPeriodoTitulo titulo={`Trimestre ${selectPeriodo?.noPeriodo}`} />
          <div className="mt-4">
            <HorizontalBarChart
              titleText="Gráfica  de calificaciones grupal"
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
              examenes={examenes}
              examenesChecked={examenesChecked}
              puntosExtra={puntosExtra}
              isCheckedPuntosExtra={isCheckedPuntosExtra}
            />
          </div>
        </div>
      )}
    </div>
  );
}
