interface RubricaItem {
  isChecked: boolean;
  value: number;
}

interface Rubrica {
  participaciones: RubricaItem;
  tareas: RubricaItem;
  examenes: RubricaItem;
  proyectos: RubricaItem;
}

export function calculateSumEncuadre(rubrica: Rubrica): number {
  return Object.values(rubrica).reduce((suma, item) => {
    return item.isChecked ? suma + item.value : suma;
  }, 0);
}
