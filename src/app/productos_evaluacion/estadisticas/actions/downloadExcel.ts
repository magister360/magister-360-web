import calculateCalificacionFinal from "@/app/calificacion/CalificacionFinal";
import { Student } from "@/app/types/alumnos/TypeStudents";
import { TypeExamenCalificacion } from "@/app/types/examen/TypeExamen";
import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";
import { TypeProyectoCalificacion } from "@/app/types/proyecto/TypeProyecto";
import { TypePuntoExtraCalificacion } from "@/app/types/puntos_extra/TypePuntoExtra";
import { TypeTareaCalificacion } from "@/app/types/tarea/TypeTarea";
import { downloadExcelApiCall } from "../controller/DownloadController";

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
  readonly trimestre: number | undefined;
  readonly isCheckedRedondear?: boolean;
  readonly setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const downloadExcel = async ({
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
  trimestre,
  isCheckedRedondear,
  setIsLoading,
}: Props): Promise<{ success: boolean; message: string }> => {
  setIsLoading(true);
  let totalExamenes = 1.0;

  if (!alumnos) {
    return { success: false, message: "Archivo invalido" };
  }

  const calificaciones = alumnos.map((student) =>
    parseFloat(
      calculateCalificacionFinal({
        noLista: student.noLista,
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
        isCheckedRedondear,
      }).toFixed(0)
    )
  );

  const nombres = getNombresInfo(alumnos);
  const noLista = getNoListaInfo(alumnos);
  const response = await downloadExcelApiCall(noLista, nombres, calificaciones);
  if (response) {
    const url = window.URL.createObjectURL(new Blob([response]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      "REGISTRO_DE_EVALUACION_TRIMESTRE" + trimestre + ".xlsx"
    );

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } else {
    console.error("No se pudo generar el archivo Excel");
    return { success: false, message: "Datos incompletos o inválidos" };
  }
  setIsLoading(false);
  return { success: true, message: "" };
};

function getNombresInfo(alumnos: Student[] | null): string[] {
  if (!alumnos) return [];

  return alumnos.map(
    (student) =>
      `${student.apellidoPaterno} ${student.apellidoMaterno} ${student.nombre}`
  );
}

function getNoListaInfo(alumnos: Student[] | null): number[] {
  if (!alumnos) return [];

  return alumnos.map((student) => student.noLista);
}
