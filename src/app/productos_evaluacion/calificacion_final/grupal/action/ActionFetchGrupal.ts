import { getAlumnos } from "../../../controller/AlumnosController";
import {
  EstatusAlumno,
  EstatusParticipacionType,
  EstatusProyectoType,
  EstatusPuntoExtraType,
  EstatusTareaType,
} from "@/app/estatus/EstatusType";
import { Student } from "@/app/types/alumnos/TypeStudents";
import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";
import {
  countParticipacionesGrupal,
  getParticipacionesGrupal,
} from "../controller/ParticipacionGrupalController";
import { PeriodoEvaluacion } from "@/app/types/periodos_evaluacion/TypePeriodosEvaluacion";
import { TypeTareaCalificacion } from "@/app/types/tarea/TypeTarea";
import {
  countTareasGrupal,
  getTareasGrupal,
} from "../controller/TareaGrupalController";
import { TypeProyectoCalificacion } from "@/app/types/proyecto/TypeProyecto";
import {
  countProyectosGrupal,
  getProyectosGrupal,
} from "../controller/ProyectoGrupalController";
import { TypePuntoExtraCalificacion } from "@/app/types/puntos_extra/TypePuntoExtra";
import { getPuntoExtraGrupal } from "../controller/PuntosExtraController";

const actionFetchGrupal = async (
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idMateria: number | undefined,
  idUsuario: number | undefined,
  periodos: PeriodoEvaluacion[] | null,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setAlumnos: React.Dispatch<React.SetStateAction<Student[] | null>>,
  setParticipaciones: React.Dispatch<
    React.SetStateAction<TypeParticipacionCalificacion[] | null>
  >,
  setTotalParticipaciones: React.Dispatch<React.SetStateAction<number>>,
  setTareas: React.Dispatch<
    React.SetStateAction<TypeTareaCalificacion[] | null>
  >,
  setTotalTareas: React.Dispatch<React.SetStateAction<number>>,
  setProyectos: React.Dispatch<
    React.SetStateAction<TypeProyectoCalificacion[] | null>
  >,
  setTotalProyectos: React.Dispatch<React.SetStateAction<number>>,
  setPuntosExtra: React.Dispatch<
    React.SetStateAction<TypePuntoExtraCalificacion[] | null>
  >
) => {
  setIsLoading(true);

  const fechasIniciales = getFechasIniciales(periodos);
  const fechasFinales = getFechasFinales(periodos);

  await getParticipacionesGrupal(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechasIniciales,
    fechasFinales,
    EstatusParticipacionType.OK
  ).then((p) => {
    setParticipaciones(p);
  });

  await countParticipacionesGrupal(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechasIniciales,
    fechasFinales,
    EstatusParticipacionType.OK
  ).then((tp) => {
    setTotalParticipaciones(tp);
  });

  /**Tareas */
  await getTareasGrupal(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechasIniciales,
    fechasFinales,
    EstatusTareaType.OK
  ).then((p) => {
    setTareas(p);
  });

  await countTareasGrupal(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechasIniciales,
    fechasFinales,
    EstatusTareaType.OK
  ).then((tp) => {
    setTotalTareas(tp);
  });
  /*Proyectos*/
  await getProyectosGrupal(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechasIniciales,
    fechasFinales,
    EstatusProyectoType.OK
  ).then((p) => {
    setProyectos(p);
  });

  await countProyectosGrupal(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechasIniciales,
    fechasFinales,
    EstatusProyectoType.OK
  ).then((tp) => {
    setTotalProyectos(tp);
  });

  /*Puntos Extra**/
  await getPuntoExtraGrupal(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechasIniciales,
    fechasFinales,
    EstatusPuntoExtraType.OK
  ).then((p) => {
    setPuntosExtra(p);
  });

  await getAlumnos(
    idUsuario,
    EstatusAlumno.OK,
    idGrado,
    idGrupo,
    idMateria
  ).then((a) => {
    setAlumnos(a);
  });

  setIsLoading(false);
};

function getFechasIniciales(periodos: PeriodoEvaluacion[] | null): string[] {
  if (!periodos || periodos.length === 0) {
    return [];
  }

  return periodos.map((periodo) => periodo.fechaInicial);
}

function getFechasFinales(periodos: PeriodoEvaluacion[] | null): string[] {
  if (!periodos || periodos.length === 0) {
    return [];
  }

  return periodos.map((periodo) => periodo.fechaFinal);
}

export default actionFetchGrupal;
