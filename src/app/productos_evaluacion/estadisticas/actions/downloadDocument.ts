import { Student } from "@/app/types/alumnos/TypeStudents";
import { downloadDocumentApiCall } from "../controller/DownloadController";
import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";
import { TypeProyectoCalificacion } from "@/app/types/proyecto/TypeProyecto";
import { TypeTareaCalificacion } from "@/app/types/tarea/TypeTarea";
import { TypeExamenCalificacion } from "@/app/types/examen/TypeExamen";
import { TypePuntoExtraCalificacion } from "@/app/types/puntos_extra/TypePuntoExtra";

type Props = {
  readonly alumnos: Student[] | null;
  readonly participaciones: TypeParticipacionCalificacion[] | null;
  readonly fechasParticipaciones: string[];
  readonly totalParticipaciones: number;
  readonly trimestre: number | undefined;
  readonly valueEncuadreParticipacion: number;
  readonly proyectos: TypeProyectoCalificacion[] | null;
  readonly fechasProyectos: string[];
  readonly totalProyectos: number;
  readonly valueEncuadreProyecto: number;
  readonly tareas: TypeTareaCalificacion[] | null;
  readonly fechasTareas: string[];
  readonly totalTareas: number;
  readonly valueEncuadreTarea: number;
  readonly examenes: TypeExamenCalificacion[] | null;
  readonly noPeriodo: number | undefined;
  readonly valueEncuadreExamen: number;
  readonly puntosExtra: TypePuntoExtraCalificacion[] | null;
  readonly isCheckedRedondear: boolean;
  
};
export const downloadDocument = async ({
  alumnos,
  participaciones,
  fechasParticipaciones,
  totalParticipaciones,
  trimestre,
  valueEncuadreParticipacion,
  proyectos,
  fechasProyectos,
  totalProyectos,
  valueEncuadreProyecto,
  tareas,
  fechasTareas,
  totalTareas,
  valueEncuadreTarea,
  examenes,
  noPeriodo,
  valueEncuadreExamen,
  puntosExtra,
  isCheckedRedondear,
}: Props): Promise<{ success: boolean; message: string }> => {
  const response = await downloadDocumentApiCall(
    alumnos,
    participaciones,
    fechasParticipaciones,
    totalParticipaciones,
    valueEncuadreParticipacion,
    proyectos,
    fechasProyectos,
    totalProyectos,
    valueEncuadreProyecto,
    tareas,
    fechasTareas,
    totalTareas,
    valueEncuadreTarea,
    examenes,
    noPeriodo,
    valueEncuadreExamen,
    puntosExtra,
    isCheckedRedondear
  );
  if (response) {
    const url = window.URL.createObjectURL(new Blob([response]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      "REGISTRO_DE_EVALUACION_TRIMESTRE" + trimestre + ".pdf"
    );

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return { success: true, message: "" };
  } else {
    return { success: false, message: "Datos incompletos o inválidos" };
  }
};
