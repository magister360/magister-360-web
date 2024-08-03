"use client";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";

import InfoCardDateGGM from "@/app/components/InfoCardDateGGM";
import { useState } from "react";
import useEncuadreCalificacionHook from "./hooks/useEncuadreCalificacionHook";

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
    idGrado,
    idGrupo,
    idMateria,
    idUsuario,
    setParticipaciones,
    setTareas,
    setExamenes,
    setProyectos,
    setIsCheckedPuntosExtra,
    setIsCheckedRedondear,
    setId
  );

  return (
    <div
      className={`mt-16 mr-4  
              ${isMenuVisible ? "ml-72" : "ml-4"}`}
    >
      <h3 className="mt-2  block text-gray-700 dark:text-gray-200 font-bold text-xl mb-2">
        Estadisticas
      </h3>

      <InfoCardDateGGM grado={grado} grupo={grupo} materia={materia} />
    </div>
  );
}
