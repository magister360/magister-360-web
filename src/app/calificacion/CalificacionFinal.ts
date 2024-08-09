import { TypeExamenCalificacion } from "../types/examen/TypeExamen";
import { TypeParticipacionCalificacion } from "../types/participacion/TypeParticipacion";
import { TypeProyectoCalificacion } from "../types/proyecto/TypeProyecto";
import { TypePuntoExtraCalificacion } from "../types/puntos_extra/TypePuntoExtra";
import { TypeTareaCalificacion } from "../types/tarea/TypeTarea";
import calculateProyecto from "./CalficacionProyecto";
import calculateExamen from "./CalificacionExamen";
import calculateParticipacion from "./CalificacionParticipacion";
import calculatePuntoExtra from "./CalificacionPuntoExtra";
import calculateTarea from "./CalificacionTarea";

type Props = {
  readonly noLista: number;
  readonly proyectos: TypeProyectoCalificacion[] | null;
  readonly totalProyectos: number;
  readonly proyectosChecked: {
    isChecked: boolean;
    value: number;
  };
  readonly participaciones: TypeParticipacionCalificacion[] | null;
  readonly totalParticipaciones: number;
  readonly participacionesChecked: {
    isChecked: boolean;
    value: number;
  };
  readonly tareas: TypeTareaCalificacion[] | null;
  readonly totalTareas: number;
  readonly tareasChecked: {
    isChecked: boolean;
    value: number;
  };
  readonly examenes: TypeExamenCalificacion[] | null;
  readonly totalExamenes: number;
  readonly examenesChecked: {
    isChecked: boolean;
    value: number;
  };
  readonly puntosExtra: TypePuntoExtraCalificacion[] | null;
  readonly isCheckedPuntosExtra: boolean;
};

export default function calculateCalificacionFinal({
  noLista,
  proyectos,
  totalProyectos,
  proyectosChecked,
  participaciones,
  totalParticipaciones,
  participacionesChecked,
  tareas,
  totalTareas,
  tareasChecked,
  examenes,
  totalExamenes,
  examenesChecked,
  puntosExtra,
  isCheckedPuntosExtra,
}: Props): number {
  let calificacionParticipacion: number = 0.0;
  if (participacionesChecked.isChecked) {
    calificacionParticipacion = calculateParticipacion({
      participaciones: participaciones,
      totalParticipaciones: totalParticipaciones,
      noLista: noLista,
      participacionesChecked: participacionesChecked,
    });
  }

  let calificacionTarea: number = 0.0;
  if (tareasChecked.isChecked) {
    calificacionTarea = calculateTarea({
      tareas: tareas,
      totalTareas: totalTareas,
      noLista: noLista,
      tareasChecked: tareasChecked,
    });
  }
  let calificacionProyecto: number = 0.0;
  if (proyectosChecked.isChecked) {
    calificacionProyecto = calculateProyecto({
      proyectos: proyectos,
      totalProyectos: totalProyectos,
      noLista: noLista,
      proyectosChecked: proyectosChecked,
    });
  }
  let calificacionExamen: number = 0.0;
  if (examenesChecked.isChecked) {
    calificacionExamen = calculateExamen({
      examenes: examenes,
      totalExamenes: totalExamenes,
      noLista: noLista,
      examenesChecked: examenesChecked,
    });
  }
  let calificacionPuntosExtra: number = 0.0;
  if (isCheckedPuntosExtra) {
    calificacionPuntosExtra = calculatePuntoExtra({
      puntosExtra: puntosExtra,

      noLista: noLista,
      isCheckedPuntosExtra: isCheckedPuntosExtra,
    });
  }

  let sumaCalificacion =
    calificacionParticipacion +
    calificacionTarea +
    calificacionProyecto +
    calificacionExamen +
    calificacionPuntosExtra;
    if(sumaCalificacion > 10){
        return 10;
    }

  return sumaCalificacion;
}
