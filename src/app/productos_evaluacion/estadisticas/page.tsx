"use client";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";

import InfoCardDateGGM from "@/app/components/InfoCardDateGGM";
import { useState } from "react";
import { AuthCheck } from "@/app/hooks/AuthCheck";
import Loading from "@/app/components/Loading";

import { PeriodoEvaluacion } from "@/app/types/periodos_evaluacion/TypePeriodosEvaluacion";
import usePeriodos from "./hooks/usePeriodos";
import CardPeriodo from "@/app/components/CardPeriodo";
import useActionFetch from "../actions/ActionFetch";
import TableAlumnoCalificacion from "./components/TableAlumnoCalificacion";
import { TypeProyectoCalificacion } from "@/app/types/proyecto/TypeProyecto";
import { TypeTareaCalificacion } from "@/app/types/tarea/TypeTarea";
import { TypeExamenCalificacion } from "@/app/types/examen/TypeExamen";
import { TypePuntoExtraCalificacion } from "@/app/types/puntos_extra/TypePuntoExtra";
import { Student } from "@/app/types/alumnos/TypeStudents";
import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";
import CardPeriodoTitulo from "@/app/components/CardPeriodoTitulo";
import useEncuadreCalificacionHook from "../hooks/useEncuadreCalificacionHook";
import GenericButton from "@/app/components/GenericButton";
import downloadExcel from "./actions/downloadExcel";

export default function Estadisticas() {
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
  const [isLoading, setIsLoading] = useState(false);
  const [periodos, setPeriodos] = useState<PeriodoEvaluacion[] | null>(null);

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
  const [selectPeriodo, setSelectPeriodo] = useState<PeriodoEvaluacion | null>(
    null
  );

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

  usePeriodos({ setIsLoading, setPeriodos });

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

  const handleDescargarExcel = () => {
    downloadExcel({
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
    });
  };

  if (idUsuario === undefined) {
    return <AuthCheck />;
  }

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  return (
    <div
      className={`mt-16 mr-4  
              ${isMenuVisible ? "ml-72" : "ml-4"}`}
    >
      <h3 className="mt-2  block text-gray-700 dark:text-gray-200 font-bold text-xl mb-2">
        Estadisticas
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
        <div className="mt-4 ">
          <CardPeriodoTitulo titulo={`Trimestre ${selectPeriodo?.noPeriodo}`} />

          <GenericButton
            onClick={handleDescargarExcel}
            buttonText="Exportar excel"
            additionalClassName="max-w-sm mb-4 mt-4"
          />

          <TableAlumnoCalificacion
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
      )}
    </div>
  );
}
