import GenericButton from "@/app/components/GenericButton";
import { Student } from "@/app/types/alumnos/TypeStudents";
import { TypeExamenCalificacion } from "@/app/types/examen/TypeExamen";
import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";
import { TypeProyectoCalificacion } from "@/app/types/proyecto/TypeProyecto";
import { TypePuntoExtraCalificacion } from "@/app/types/puntos_extra/TypePuntoExtra";
import { TypeTareaCalificacion } from "@/app/types/tarea/TypeTarea";
import { downloadDocument } from "../actions/downloadDocument";
import { PeriodoEvaluacion } from "@/app/types/periodos_evaluacion/TypePeriodosEvaluacion";
import { getParticipacionFechas } from "@/app/controller/ParticipacionController";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import { getProyectoFechas } from "@/app/controller/ProyectoController";
import { getTareaFechas } from "@/app/controller/TareaController";

type Props = {
  readonly alumnos: Student[] | null;
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
  readonly proyectos: TypeProyectoCalificacion[] | null;
  readonly totalProyectos: number;
  readonly proyectosChecked: {
    isChecked: boolean;
    value: number;
  };
  readonly examenes: TypeExamenCalificacion[] | null;

  readonly examenesChecked: {
    isChecked: boolean;
    value: number;
  };
  readonly puntosExtra: TypePuntoExtraCalificacion[] | null;

  readonly isCheckedPuntosExtra: boolean;
  readonly isCheckedRedondear: boolean;
  readonly selectPeriodo: PeriodoEvaluacion | null;
  readonly setIsErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  readonly setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  readonly setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DocumentButton({
  alumnos,
  participaciones,
  totalParticipaciones,
  participacionesChecked,
  tareas,
  totalTareas,
  tareasChecked,
  proyectos,
  totalProyectos,
  proyectosChecked,
  examenes,
  examenesChecked,
  puntosExtra,
  isCheckedPuntosExtra,
  isCheckedRedondear,
  selectPeriodo,
  setIsErrorModalOpen,
  setErrorMessage,
  setIsLoading
}: Props) {
  const { idUsuario, idGrado, idGrupo, idMateria } = useSidebarContext();

  let totalExamenes = 1;

  const handleDescargarDocument = async () => {
    setIsLoading(true)
    const fechasParticipaciones = await getParticipacionFechas(
      idGrado,
      idGrupo,
      idMateria,
      idUsuario,
      selectPeriodo?.fechaInicial,
      selectPeriodo?.fechaFinal
    );

    const fechasProyectos = await getProyectoFechas(
      idGrado,
      idGrupo,
      idMateria,
      idUsuario,
      selectPeriodo?.fechaInicial,
      selectPeriodo?.fechaFinal
    );
    const fechasTareas = await getTareaFechas(
      idGrado,
      idGrupo,
      idMateria,
      idUsuario,
      selectPeriodo?.fechaInicial,
      selectPeriodo?.fechaFinal
    );

    const result = await downloadDocument({
      alumnos,
      participaciones,
      fechasParticipaciones,
      trimestre: selectPeriodo?.noPeriodo,
      totalParticipaciones,
      valueEncuadreParticipacion: participacionesChecked.value,

      proyectos,
      fechasProyectos,
      totalProyectos,
      valueEncuadreProyecto: proyectosChecked.value,
      tareas,
      fechasTareas,
      totalTareas,
      valueEncuadreTarea: tareasChecked.value,
      examenes,
      noPeriodo: selectPeriodo?.noPeriodo,
      valueEncuadreExamen: examenesChecked.value,
      puntosExtra,
      isCheckedRedondear

    });
    if (!result.success) {
      setErrorMessage(result.message);
      setIsErrorModalOpen(true);
    }
    setIsLoading(false)
  };

  return (
    <GenericButton
      onClick={handleDescargarDocument}
      buttonText="Exportar pdf"
      additionalClassName="max-w-sm mb-4 mt-4"
    />
  );
}
