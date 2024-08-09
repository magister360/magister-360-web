import { TypeProyectoCalificacion } from "@/app/types/proyecto/TypeProyecto";
import { number } from "echarts/core";

type Props = {
  readonly proyectos: TypeProyectoCalificacion[] | null;
  readonly totalProyectos: number;
  readonly noLista: number;
  readonly proyectosChecked: {
    isChecked: boolean;
    value: number;
  };
};

export default function calculateProyecto({
  proyectos,
  totalProyectos,
  noLista,
  proyectosChecked,
}: Props): number {
  const calificacion = proyectos
    ?.filter((proyecto) => proyecto.noLista === noLista)
    .reduce((sum, proyecto) => sum + proyecto.calificacion, 0);
  if (calificacion === undefined || totalProyectos === 0) {
    return 0;
  }

  let promedio = calificacion / totalProyectos;
  let encuadre = (proyectosChecked.value * promedio) / 100;
  return Number(encuadre);
}
