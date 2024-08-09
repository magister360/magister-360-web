import { TypeTareaCalificacion } from "@/app/types/tarea/TypeTarea";

type Props = {
  readonly tareas: TypeTareaCalificacion[] | null;
  readonly totalTareas: number;
  readonly noLista: number;
  readonly tareasChecked: {
    isChecked: boolean;
    value: number;
  };
};

export default function calculateTarea({
  tareas,
  totalTareas,
  noLista,
  tareasChecked,
}: Props):number {
  const calificacion = tareas
    ?.filter((tarea) => tarea.noLista === noLista)
    .reduce((sum, tarea) => sum + tarea.calificacion, 0);
  if (calificacion === undefined || totalTareas === 0) {
    return 0;
  }

  let promedio = calificacion / totalTareas;
  let encuadre = (tareasChecked.value * promedio) / 100;
  return Number(encuadre);
}
