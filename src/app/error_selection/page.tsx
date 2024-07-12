"use client";
import { useSidebarContext } from "../sidebar/SidebarContext";
import { SvgIcons } from "../svg/SvgIcons";

export default function ErrorSelection() {
  const { idGrado, idGrupo, idMateria } = useSidebarContext();
  return (
    <div
      className="ml-72 mt-16 pt-4 pb-4 pl-4 pr-4  rounded-lg shadow  
                 sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]"
    >
      <p className="dark:text-gray-500">
        No ha seleccionado grado, grupo y materia.
      </p>
      {idGrado === -1 && (
        <div className="flex gap-4 mt-2">
          <SvgIcons.Circle />
          <p className="dark:text-gray-500">Ir a configuracion - grado</p>
        </div>
      )}
      {idGrupo === -1 && (
        <div className="flex gap-4 mt-2">
          <SvgIcons.Circle />
          <p className="dark:text-gray-500">Ir a configuracion - grupo</p>
        </div>
      )}
      {idMateria === -1 && (
        <div className="flex gap-4 mt-2">
          <SvgIcons.Circle />
          <p className="dark:text-gray-500">Ir a configuracion - materia</p>
        </div>
      )}
    </div>
  );
}
