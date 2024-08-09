import { TypePuntoExtraCalificacion } from "@/app/types/puntos_extra/TypePuntoExtra";

type Props = {
  readonly puntosExtra: TypePuntoExtraCalificacion[] | null;

  readonly noLista: number;
  readonly isCheckedPuntosExtra: boolean;
};

export default function calculatePuntoExtra({
  puntosExtra,
  noLista,
  isCheckedPuntosExtra,
}: Props): number {
  const calificacion = puntosExtra
    ?.filter((puntoExtra) => puntoExtra.noLista === noLista)
    .reduce((sum, puntoExtra) => sum + puntoExtra.calificacion, 0);
  if (calificacion === undefined) {
    return 0;
  }

  return calificacion;
}
