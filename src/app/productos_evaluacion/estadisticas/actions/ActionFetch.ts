import {
  EstatusAlumno,
  EstatusExamenType,
  EstatusParticipacionType,
  EstatusProyectoType,
  EstatusPuntoExtraType,
  EstatusTareaType,
} from "@/app/estatus/EstatusType";
import {
  countParticipaciones,
  getParticipaciones,
} from "../controller/ParticipacionController";
import { countProyectos, getProyectos } from "../controller/ProyectoController";
import { countTareas, getTareas } from "../controller/TareaController";
import { getExamenes } from "../controller/ExamenController";
import { getPuntoExtra } from "../controller/PuntoExtraController";
import { getAlumnos } from "../controller/AlumnosController";
import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";
import { TypeProyectoCalificacion } from "@/app/types/proyecto/TypeProyecto";
import { TypeTareaCalificacion } from "@/app/types/tarea/TypeTarea";
import { TypeExamenCalificacion, TypeExamenPeriodo } from "@/app/types/examen/TypeExamen";
import { TypePuntoExtraCalificacion } from "@/app/types/puntos_extra/TypePuntoExtra";
import { Student } from "@/app/types/alumnos/TypeStudents";

const useActionFetch = async (
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idMateria: number | undefined,
  idUsuario: number | undefined,
  fechaInicial: string | undefined,
  fechaFinal: string | undefined,
  noPeriodo: number | undefined,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setParticipaciones: React.Dispatch<
    React.SetStateAction<TypeParticipacionCalificacion[] | null>
  >,
  setTotalParticipaciones: React.Dispatch<React.SetStateAction<number>>,
  setProyectos: React.Dispatch<
    React.SetStateAction<TypeProyectoCalificacion[] | null>
  >,
  setTotalProyectos: React.Dispatch<React.SetStateAction<number>>,
  setTareas: React.Dispatch<React.SetStateAction<TypeTareaCalificacion[] | null>>,
  setTotalTareas: React.Dispatch<React.SetStateAction<number>>,
  setExamenes: React.Dispatch<React.SetStateAction<TypeExamenCalificacion[] | null>>,
  setPuntosExtra: React.Dispatch<
    React.SetStateAction<TypePuntoExtraCalificacion[] | null>
  >,
  setAlumnos: React.Dispatch<React.SetStateAction<Student[] | null>>
) => {
  setIsLoading(true);

  await getParticipaciones(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
    EstatusParticipacionType.OK
  ).then((p) => {
    setParticipaciones(p);
  });

  await countParticipaciones(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
    EstatusParticipacionType.OK
  ).then((tp) => {
    setTotalParticipaciones(tp);
  });

  await getProyectos(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
    EstatusProyectoType.OK
  ).then((p) => {
    setProyectos(p);
  });

  await countProyectos(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
    EstatusProyectoType.OK
  ).then((p) => {
    setTotalProyectos(p);
  });

  await getTareas(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
    EstatusTareaType.OK
  ).then((t) => {
    setTareas(t);
  });
  await countTareas(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
    EstatusTareaType.OK
  ).then((t) => {
    setTotalTareas(t);
  });

  await getExamenes(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    noPeriodo,
    EstatusExamenType.OK
  ).then((e) => {
    
    setExamenes(e);
  });

  await getPuntoExtra(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
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

export default useActionFetch;
