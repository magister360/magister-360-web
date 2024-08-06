"use client";

import React from "react";
import EditableCalendar from "./components/EditableCalendar";

export default function Visualizar() {
  const startDate = new Date("2024-07-17");
  const endDate = new Date("2024-09-29");
  const initialData = [
    { content: "Consejo Técnico Escolar" },
    { content: "Semana de diagnóstico" },
    { content: "Expresión de fracciones" },
  ];

  const handleSave = (data: { startDate: Date; endDate: Date; content: string }[]) => {
    console.log("Saved data:", data);
  };

  return (
    <div className="mt-16 ml-72">
      <EditableCalendar
        startDate={startDate}
        endDate={endDate}
        initialData={initialData}
        onSave={handleSave}
      />
    </div>
  );
}
