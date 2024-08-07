"use client";

import React, { useState } from "react";
import EditableCalendar from "./components/EditableCalendar";
import useCronograma from "./hooks/useCronograma";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import { InicioFinClases } from "@/app/types/inicio_fin_clases/TypeInicioFinClases";
import useClases from "./hooks/useClases";

export default function Visualizar() {
  const { isMenuVisible, idUsuario, idMateria, idGrado, idGrupo } =
    useSidebarContext();
  const [isFetch, setIsFetch] = useState<boolean>(true);
  const [inicioFinClases, setInicioFinClases] =
    useState<InicioFinClases | null>(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<number | undefined>(undefined);

  const startDate = new Date("2024-07-17");

  const endDate = new Date("2024-09-29");
  const initialData = [
    { content: "Consejo Técnico Escolar" },
    { content: "Semana de diagnóstico" },
    { content: "Expresión de fracciones" },
  ];

  const handleSave = (
    data: { startDate: Date; endDate: Date; content: string }[]
  ) => {
    console.log("Saved data:", data);
  };

  useClases({
    setLoading,
    isFetch,
    setIsFetch,
    setInicioFinClases,
    setId,
  });
  const cronogramas = useCronograma(idUsuario, idMateria, idGrado, idGrupo);

  return (
    <div className="mt-16 ml-72">
      <EditableCalendar
        cronogramas={cronogramas}
        initialData={[
          { monthYear: "enero-2024", contents: ["Content 1", "Content 2"] },
          { monthYear: "febrero-2024", contents: ["Content 3"] },
          // ... more months
        ]}
        inicioFinClases={inicioFinClases}
      />
    </div>
  );
}
