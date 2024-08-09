import { TypeExamenCalificacion } from "@/app/types/examen/TypeExamen";

type Props = {
  readonly examenes: TypeExamenCalificacion[] | null;
  readonly totalExamenes: number;
  readonly noLista: number;
  readonly examenesChecked: {
    isChecked: boolean;
    value: number;
  };
};

export default function calculateExamen({
  examenes,
  totalExamenes,
  noLista,
  examenesChecked,
}: Props): number {
  const calificacion = examenes
    ?.filter((examen) => examen.noLista === noLista)
    .reduce((sum, examen) => sum + examen.calificacion, 0);
  if (calificacion === undefined || totalExamenes === 0) {
    return 0;
  }

  let promedio = calificacion / totalExamenes;
  let encuadre = (examenesChecked.value * promedio) / 100;
  return Number(encuadre);
}
