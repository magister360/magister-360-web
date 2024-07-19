"use client";
import Card from "@/app/components/Card";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import Link from "next/link";

export default function CardParticipaciones() {
  const { idGrado, idGrupo, idMateria } = useSidebarContext();

  return (
    <Card
      imageSrc="/contenido.svg"
      imageAlt="participaciones"
      title="Registro de participaciones"
      description="  Ingrese y actualice las participaciones de los alumnos en esta
          sección."
    >
      <Link
        href={
          idGrado !== -1 && idGrupo !== -1 && idMateria !== -1
            ? "/organizacion_grupos/actividades/participacion/select_fecha/codigo_barras"
            : "/error_selection"
        }
        className="w-full text-center px-3 py-2 text-sm font-medium
                text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-4 
                  focus:outline-none focus:ring-blue-300 dark:bg-blue-600 
                  dark:hover:bg-blue-500 "
      >
        Código de barras
      </Link>

      <Link
        href="/paint"
        className="w-full text-center px-3 py-2 text-sm font-medium
                  text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-4 
                  focus:outline-none focus:ring-blue-300 dark:bg-blue-600 
                  dark:hover:bg-blue-500 "
      >
        Pasar al frente
      </Link>

      <Link
         href={
          idGrado !== -1 && idGrupo !== -1 && idMateria !== -1
            ? "/organizacion_grupos/actividades/participacion/select_fecha/manual"
            : "/error_selection"
        }
        className="w-full text-center px-3 py-2 text-sm font-medium
                  text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-4 
                  focus:outline-none focus:ring-blue-300 dark:bg-blue-600 
                  dark:hover:bg-blue-500 "
      >
        Manual
      </Link>

      <Link
       href={
        idGrado !== -1 && idGrupo !== -1 && idMateria !== -1
          ? "/organizacion_grupos/actividades/participacion/seguimiento"
          : "/error_selection"
      }
        className="w-full text-center px-3 py-2 text-sm font-medium
              text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-4 
                focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500 "
      >
        Seguimiento de participación
      </Link>
    </Card>
  );
}
