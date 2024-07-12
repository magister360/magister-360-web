"use client";

import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import CardAlumnosExcel from "./components/CardAlumnosExcel";
import CardVisualizarAlumnos from "./components/CardVisualizarAlumnos";

export default function Alumno() {
  const { isMenuVisible } = useSidebarContext();

  return (
    <div
      className={`mt-16 mr-4  
              ${isMenuVisible ? "ml-72" : "ml-4"}`}
    >
      <div className="grid grid-cols-4 ">
        <div className="grid grid-cols-subgrid gap-4 col-span-3">
          <CardAlumnosExcel />
          <CardVisualizarAlumnos />
        </div>
      </div>
    </div>
  );
}
