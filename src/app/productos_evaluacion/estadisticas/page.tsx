"use client";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";

import InfoCardDateGGM from "@/app/components/InfoCardDateGGM";
import { useState } from "react";
import useEncuadreCalificacionHook from "./hooks/useEncuadreCalificacionHook";
import useParticipacion from "./hooks/useParticipacion";
import { AuthCheck } from "@/app/hooks/AuthCheck";
import Loading from "@/app/components/Loading";

import { PeriodoEvaluacion } from "@/app/types/periodos_evaluacion/TypePeriodosEvaluacion";
import usePeriodos from "./hooks/usePeriodos";
import CardPeriodo from "@/app/components/CardPeriodo";
import actionFetch from "./actions/ActionFetch";

export default function Estadisticas() {
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

  const [participaciones, setParticipaciones] = useState({
    isChecked: false,
    value: 0,
  });
  const [tareas, setTareas] = useState({ isChecked: false, value: 0 });
  const [examenes, setExamenes] = useState({ isChecked: false, value: 0 });
  const [proyectos, setProyectos] = useState({ isChecked: false, value: 0 });

  const handleParticipacionesChange = (isChecked: boolean, value: number) => {
    setParticipaciones({ isChecked, value });
  };

  const [isCheckedPuntosExtra, setIsCheckedPuntosExtra] = useState(false);
  const [isCheckedRedondear, setIsCheckedRedondear] = useState(false);
  const [id, setId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [periodos, setPeriodos] = useState<PeriodoEvaluacion[] | null>(null);
  const [selectPeriodo, setSelectPeriodo] = useState<PeriodoEvaluacion | null>(
    null
  );

  const handleTareasChange = (isChecked: boolean, value: number) => {
    setTareas({ isChecked, value });
  };

  const handleExamenesChange = (isChecked: boolean, value: number) => {
    setExamenes({ isChecked, value });
  };

  const handleProyectosChange = (isChecked: boolean, value: number) => {
    setProyectos({ isChecked, value });
  };

  useEncuadreCalificacionHook(
    setParticipaciones,
    setTareas,
    setExamenes,
    setProyectos,
    setIsCheckedPuntosExtra,
    setIsCheckedRedondear,
    setId,
    setIsLoading
  );

  usePeriodos({ setIsLoading, setPeriodos });

  useParticipacion(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    undefined,
    undefined,
    // "inicioFinClases?.fechaInicial",
    //"inicioFinClases?.fechaFinal",
    setIsLoading
  );

  const actionFetchEstadisticas = async (
    periodoEvaluacion: PeriodoEvaluacion | null
  ) => {
    await actionFetch(idUsuario,
      idMateria,
      idGrado,
      idGrupo,
      periodoEvaluacion?.fechaInicial,
      periodoEvaluacion?.fechaFinal,
      periodoEvaluacion?.noPeriodo,
      setIsLoading);

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
    </div>
  );
}
