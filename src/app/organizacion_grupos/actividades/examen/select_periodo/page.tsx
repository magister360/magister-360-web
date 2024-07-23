"use client";

import { AuthCheck } from "@/app/hooks/AuthCheck";
import SelectorPeriodo from "@/app/components/SelectorPeriodo";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";

export default function SelectPeriodo() {
  const { idUsuario } = useSidebarContext();

  if (idUsuario === undefined) {
    return <AuthCheck />;
  }

  return (
    <SelectorPeriodo route="/organizacion_grupos/actividades/examen/manual" />
  );
}
