"use client";
import Card from "@/app/components/Card";

export default function CardCalendarioEscolar() {
  function redirectToCalendar() {
    const url = "https://calendarioescolar.sep.gob.mx";
    const win = window.open(url, "_blank");
    if (win !== null) {
      win.focus();
    }
  }
  return (
    <Card
      imageSrc="/contenido.svg"
      imageAlt="calendario escolar"
      title="Calendario Escolar"
      description="Abrir calendario escolar para consultar fechas."
    >
      <button
        type="button"
        onClick={redirectToCalendar}
        className="w-full text-center px-3 py-2 text-sm font-medium
                text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-4 
                  focus:outline-none focus:ring-blue-300 dark:bg-blue-600
                   dark:hover:bg-blue-500   "
      >
        Ir a calendario escolar
      </button>
    </Card>
  );
}
