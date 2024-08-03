"use client";
import Card from "@/app/components/Card";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import Link from "next/link";

export default function CardAsistencias() {
  const { idGrado, idGrupo, idMateria } = useSidebarContext();

  return (
    <Card
      imageSrc="/contenido.svg"
      imageAlt="asistencias"
      title="Registro de asistencias"
      description="Ingrese y actualice las asistencias de los alumnos en esta sección."
    >
      <Link
        href={
          idGrado !== -1 && idGrupo !== -1 && idMateria !== -1
            ? "/organizacion_grupos/actividades/asistencia/select_fecha/manual"
            : "/error_selection"
        }
        className="w-full text-center px-3 py-2 text-sm font-medium
                text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-4 
                  focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500 "
      >
        Manual
      </Link>

      <Link
        href="#"
        className="w-full text-center px-3 py-2 text-sm font-medium
                text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-4 
                  focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500 "
      >
        Seguimiento de asistencias
      </Link>
    </Card>
  );
}
