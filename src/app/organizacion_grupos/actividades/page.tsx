"use client";
import CardParticipaciones from "./components/CardParticipaciones";
import CardAsistencia from "./components/CardAsistencia";
import CardProyectos from "./components/CardProyectos";
import CardExamenes from "./components/CardExamenes";
import CardTareas from "./components/CardTareas";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import CardPuntosExtra from "./components/CardPuntosExtra";
import useEncuadreHook from "./hooks/useEncuadreHook";
import { AuthCheck } from "@/app/hooks/AuthCheck";

export default function Actividades() {
  const { isMenuVisible, idGrado, idGrupo, idMateria, idUsuario } =
    useSidebarContext();

  const {
    isParticipacion,
    isTarea,
    isExamenes,
    isProyectos,
    isCheckedPuntosExtra,
  } = useEncuadreHook(idGrado, idGrupo, idMateria, idUsuario);

  if (idUsuario === undefined) {
    return <AuthCheck />;
  }

  return (
    <div
      className={`mt-16 mr-4  grid grid-cols-1 gap-4 md:grid-cols-4
      ${isMenuVisible ? "ml-72" : "ml-4"}`}
    >
      <div
        className="grid grid-cols-1 gap-4 col-span-1 md:col-span-3 sm:grid-cols-2 
      lg:grid-cols-3"
      >
        {isParticipacion && <CardParticipaciones />}
        <CardAsistencia />
        {isTarea && <CardTareas />}
        {isExamenes && <CardExamenes />}
        {isProyectos && <CardProyectos />}
        {isCheckedPuntosExtra && <CardPuntosExtra />}
      </div>
    </div>
  );
}
