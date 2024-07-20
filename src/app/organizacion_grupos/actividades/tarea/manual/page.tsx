"use client";

import { AuthCheck } from "@/app/hooks/AuthCheck";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { formatDateLocale } from "@/app/utils/DateUtils";
import InfoCardDateGGM from "@/app/components/InfoCardDateGGM";
import { useAlumnosManualHook } from "./hooks/useAlumnosManualHook";
import { useTareasManualHook } from "./hooks/useTareasHook";
import { EstatusTareaType } from "@/app/estatus/EstatusType";
import TableAlumnosTarea from "./conponenetts/TableAlumnosTarea";

export default function Manual() {
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

  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const [date, setDate] = useState<string | null>(null);
  const [dateFormatStr, setDateFormatStr] = useState<string | null>(null);
  const [isFetchTarea, setIsFetchTarea] =
    useState<boolean>(true);
  const { alumnos } = useAlumnosManualHook(
    idUsuario,
    0,
    idGrado,
    idGrupo,
    idMateria,
    setLoading
  );

  const { tareas } = useTareasManualHook(
    idUsuario,
    EstatusTareaType.OK,
    idGrado,
    idGrupo,
    idMateria,
    setLoading,
    date,
    setIsFetchTarea,
    isFetchTarea
  );

  useEffect(() => {
    if (searchParams) {
      const dateParam = searchParams.get("date");
      if (dateParam) {
        setDate(dateParam);
        const formatDateStr = formatDateLocale(dateParam);
        setDateFormatStr(formatDateStr);
      }
    }
  }, [searchParams]);

  if (idUsuario === undefined) {
    return <AuthCheck />;
  }

  return (
    <div
      className={`mt-16 mr-4  
                ${isMenuVisible ? "ml-72" : "ml-4"}`}
    >
      <h3
        className=" md:mt-14 block text-gray-700 dark:text-gray-200 
                font-bold text-xl mb-2"
      >
        Tarea manual
      </h3>

      <InfoCardDateGGM
        dateFormatStr={dateFormatStr}
        grado={grado}
        grupo={grupo}
        materia={materia}
      />

      <div>
        <TableAlumnosTarea
          students={alumnos}
          date={date}
          tareas={tareas}
          setIsFetchTarea={setIsFetchTarea}
        />
      </div>
    </div>
  );
}
