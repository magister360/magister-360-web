import Link from "next/link";
import CardParticipaciones from "./components/CardParticipacioens";
import CardAsistencia from "./components/CardAsistencia";
import CardProyectos from "./components/CardProyectos";
import CardExamenes from "./components/CardExamenes";

export default function Actividades() {
  return (
    <div className="mt-14 grid grid-cols-1 gap-4 ml-72 md:grid-cols-4">
      <div className="grid grid-cols-1 gap-4 col-span-1 md:col-span-3 sm:grid-cols-2 lg:grid-cols-3">
        <CardParticipaciones />
        <CardAsistencia />
        <CardProyectos />
        <CardExamenes />
      </div>
    </div>
  );
}
