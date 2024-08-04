"use client";

import Image from "next/image";

import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import CardPeriodosFechas from "./components/CardPeriodosFechas";
import CardInicioFinClases from "./components/CardInicioFinClases";
import CardCalendarioEscolar from "./components/CardCalendarioEscolar";
import CardFechaFecha from "./components/CardFechaFestiva";

export default function Fechas() {
  const { isMenuVisible } = useSidebarContext();

  return (
    <div
      className={`mt-16 mr-4  grid grid-cols-1 gap-4 md:grid-cols-4 mb-14
      ${isMenuVisible ? "ml-72" : "ml-4"}`}
    >
      <div
        className="grid grid-cols-1 gap-4 col-span-1 md:col-span-3 sm:grid-cols-2 
      lg:grid-cols-3"
      >
        <CardPeriodosFechas />
        <CardInicioFinClases />
        <CardCalendarioEscolar />
        <CardFechaFecha />
      </div>
    </div>
  );
}
