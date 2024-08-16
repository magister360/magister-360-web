import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";
import { number } from "echarts/types/src/echarts.all.js";

type Props = {
  readonly participaciones: TypeParticipacionCalificacion[] | null;
  readonly totalParticipaciones: number;
  readonly noLista: number;
  readonly participacionesChecked: {
    isChecked: boolean;
    value: number;
  };
};

export default function calculateParticipacion({
  participaciones,
  totalParticipaciones,
  noLista,
  participacionesChecked,
}: Props): number {
  const calificacion = participaciones
    ?.filter((participacion) => participacion.noLista === noLista)
    .reduce((sum, participacion) => sum + participacion.calificacion, 0);
  if (calificacion === undefined || totalParticipaciones === 0) {
    return 0;
  }

  let promedio = calificacion / totalParticipaciones;
  let encuadre = (participacionesChecked.value * promedio) / 100;
  return Number(encuadre);
}

export function sumCalificacionParticipacion(
  participaciones: TypeParticipacionCalificacion[]
): number {
  return participaciones.reduce(
    (suma, participacion) => suma + participacion.calificacion,
    0
  );
}

export function calcularEncuadreParticipacion(
  totalParticipaciones: number,
  suma: number,
  valueParticipacion: number
): number {
  let promedio = suma / totalParticipaciones;
  let encuadre = (valueParticipacion * promedio) / 100;
  return Number(encuadre);
}
