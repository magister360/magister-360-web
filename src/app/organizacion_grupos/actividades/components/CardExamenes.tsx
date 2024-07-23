"use client";
import Card from "@/app/components/Card";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import Link from "next/link";

export default function CardTareas() {
  const { idGrado, idGrupo, idMateria } = useSidebarContext();

  return (
    <Card
      imageSrc="/contenido.svg"
      imageAlt="examenes"
      title="Registro de examenes"
      description=" Ingrese y actualice los examenes de los alumnos en esta
            sección."
    >
      <Link
        href={
          idGrado !== -1 && idGrupo !== -1 && idMateria !== -1
            ? "/organizacion_grupos/actividades/examen/select_periodo"
            : "/error_selection"
        }
        className="w-full text-center px-3 py-2 text-sm font-medium
                text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-4 
                  focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500 "
      >
        Manual
      </Link>

      <Link
         href={
          idGrado !== -1 && idGrupo !== -1 && idMateria !== -1
            ? "/organizacion_grupos/actividades/examen/seguimiento"
            : "/error_selection"
        }
        className="w-full text-center px-3 py-2 text-sm font-medium
                text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-4 
                  focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500 "
      >
        Seguimiento de examenes
      </Link>
    </Card>
  );
}
