"use client";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TableAlumnosExamen from "./conponents/TableAlumnosExamen";
import InfoCardDateGGM from "@/app/components/InfoCardDateGGM";
import { useAlumnosManualHook } from "./hooks/useAlumnosManualHook";
import { useExamnesManualHook } from "./hooks/useExamenesHook";
import { EstatusExamenType } from "@/app/estatus/EstatusType";

export default function ExamenManual() {
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
  const searchParams = useSearchParams();
  const [periodo, setPeriodo] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [isFetchExamen, setIsFetchExamen] = useState<boolean>(true);

  const { alumnos } = useAlumnosManualHook(
    idUsuario,
    0,
    idGrado,
    idGrupo,
    idMateria,
    setLoading
  );

  const { examenes } = useExamnesManualHook(
    idUsuario,
    EstatusExamenType.OK,
    idGrado,
    idGrupo,
    idMateria,
    setLoading,
    periodo,
    setIsFetchExamen,
    isFetchExamen
  );

  useEffect(() => {
    if (searchParams) {
      const periodoParam = searchParams.get("periodo");
      if (periodoParam) {
        setPeriodo(periodoParam);
      }
    }
  }, [searchParams]);
  return (
    <div
      className={`mt-16 mr-4  
              ${isMenuVisible ? "ml-72" : "ml-4"}`}
    >
      <h3
        className=" md:mt-14 block text-gray-700 dark:text-gray-200 
              font-bold text-xl mb-2"
      >
        Examen manual
      </h3>

      <InfoCardDateGGM
        grado={grado}
        grupo={grupo}
        materia={materia}
        noPeriodo={periodo}
      />

      <div>
        <TableAlumnosExamen
          students={alumnos}
          noPeriodo={periodo}
          examenes={examenes}
          setIsFetchExamen={setIsFetchExamen}
        />
      </div>
    </div>
  );
}
