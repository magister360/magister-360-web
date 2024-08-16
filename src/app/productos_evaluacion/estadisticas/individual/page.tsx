"use client";
import InfoCardDateGGM from "@/app/components/InfoCardDateGGM";
import { getAlumnos } from "@/app/controller/AlumnoController";
import {
  EstatusAlumno,
  EstatusExamenType,
  EstatusFechaPeriodosType,
  EstatusParticipacionType,
  EstatusProyectoType,
  EstatusPuntoExtraType,
  EstatusTareaType,
} from "@/app/estatus/EstatusType";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import { SvgIcons } from "@/app/svg/SvgIcons";
import { Student } from "@/app/types/alumnos/TypeStudents";
import { useEffect, useRef, useState } from "react";
import TableAlumnos from "./components/TableAlumnos";
import StudentSelectCard from "@/app/components/StudentSelectCard";
import CardPeriodo from "@/app/components/CardPeriodo";
import { PeriodoEvaluacion } from "@/app/types/periodos_evaluacion/TypePeriodosEvaluacion";
import { getFechasPeriodos } from "@/app/controller/PeriodosEvaluacionController";
import {
  calificacionExamen,
  calificacionParticipacion,
  calificacionProyecto,
  calificacionPuntoExtra,
  calificacionTarea,
  getFechasParticipacion,
  getFechasTarea,
} from "./controller/CalificacionController";
import TableParticipacion from "./components/TableParticipacion";
import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";
import useEncuadreCalificacionHook from "../../hooks/useEncuadreCalificacionHook";
import Loading from "@/app/components/Loading";
import { TypeTareaCalificacion } from "@/app/types/tarea/TypeTarea";
import TableTareas from "./components/TableTareas";
import { TypeProyectoCalificacion } from "@/app/types/proyecto/TypeProyecto";
import { getFechasProyecto } from "@/app/organizacion_grupos/actividades/proyecto/seguimiento/controller/SegProyectoController";
import TableProyecto from "./components/TableProyecto";
import { TypeExamenCalificacion } from "@/app/types/examen/TypeExamen";
import TableExamen from "./components/TableExamen";
import { TypePuntoExtraCalificacion } from "@/app/types/puntos_extra/TypePuntoExtra";
import tarea from "../../../../../pages/api/tarea";
import TablePuntoExtras from "./components/TablePuntoExtra";

export default function EstadisticasIndividual() {
  const {
    isMenuVisible,
    grado,
    grupo,
    materia,
    idUsuario,
    idGrado,
    idGrupo,
    idMateria,
  } = useSidebarContext();
  const [loading, setLoading] = useState(false);

  const barcodeInputRef = useRef<HTMLInputElement>(null);
  const [valueSearch, setValueSearch] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(event.target.value);
  };
  const [alumnos, setAlumnos] = useState<Student[]>([]);

  const [selectAlumno, setSelectAlumno] = useState<Student | undefined>(
    undefined
  );

  const [periodos, setPeriodos] = useState<PeriodoEvaluacion[] | null>(null);
  const [selectPeriodo, setSelectPeriodo] = useState<PeriodoEvaluacion | null>(
    null
  );

  const [fechasParticipacion, setFechasParticipacion] = useState<string[]>([]);
  const [participaciones, setParticipaciones] = useState<
    TypeParticipacionCalificacion[]
  >([]);
  const [fechasTareas, setFechasTarea] = useState<string[]>([]);
  const [tareas, setTareas] = useState<TypeTareaCalificacion[]>([]);
  const [fechasProyectos, setFechasProyectos] = useState<string[]>([]);
  const [proyectos, setProyectos] = useState<TypeProyectoCalificacion[]>([]);
  const [examenes, setExamenes] = useState<TypeExamenCalificacion[]>([]);
  const [puntosExtra, setPuntosExtra] = useState<TypePuntoExtraCalificacion[]>(
    []
  );

  const [participacionesChecked, setParticipacionesChecked] = useState({
    isChecked: false,
    value: 0,
  });
  const [tareasChecked, setTareasChecked] = useState({
    isChecked: false,
    value: 0,
  });
  const [examenesChecked, setExamenesChecked] = useState({
    isChecked: false,
    value: 0,
  });
  const [proyectosChecked, setProyectosChecked] = useState({
    isChecked: false,
    value: 0,
  });

  const [isCheckedPuntosExtra, setIsCheckedPuntosExtra] = useState(false);
  const [isCheckedRedondear, setIsCheckedRedondear] = useState(false);
  const [id, setId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      fetchAlumno(valueSearch);
      setValueSearch("");
    }
  };

  useEncuadreCalificacionHook(
    setParticipacionesChecked,
    setTareasChecked,
    setExamenesChecked,
    setProyectosChecked,
    setIsCheckedPuntosExtra,
    setIsCheckedRedondear,
    setId,
    setIsLoading
  );

  const fetchAlumno = async (busqueda: string) => {
    const result = await getAlumnos(
      idUsuario,
      EstatusAlumno.OK,
      idGrado,
      idGrupo,
      busqueda,
      idMateria
    );

    setAlumnos(result);
  };

  const fetchPeriodos = async () => {
    setLoading(true);

    try {
      const result = await getFechasPeriodos(
        idUsuario,
        EstatusFechaPeriodosType.OK
      );
      if (result) {
        setPeriodos(result);
      }
    } catch (err) {
      setPeriodos(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    fetchAlumno(valueSearch);
  };

  const fetchFechasCalificacion = async (
    periodoEvaluacion: PeriodoEvaluacion | null
  ) => {
    setLoading(true);
    /**Participaciones */
    try {
      const resultParticipaciones = await calificacionParticipacion({
        idUsuario,
        idMateria,
        idGrado,
        idGrupo,
        fechaInicial: periodoEvaluacion?.fechaInicial,
        fechaFinal: periodoEvaluacion?.fechaFinal,
        estatus: EstatusParticipacionType.OK,
        idAlumno: selectAlumno?.id,
      });
      const resultFechasParticipacion = await getFechasParticipacion(
        idGrado,
        idGrupo,
        idMateria,
        idUsuario,
        periodoEvaluacion?.fechaInicial,
        periodoEvaluacion?.fechaFinal
      );

      setParticipaciones(resultParticipaciones);
      setFechasParticipacion(resultFechasParticipacion);

      /**Tareas */
      const resultTareas = await calificacionTarea({
        idUsuario,
        idMateria,
        idGrado,
        idGrupo,
        fechaInicial: periodoEvaluacion?.fechaInicial,
        fechaFinal: periodoEvaluacion?.fechaFinal,
        estatus: EstatusTareaType.OK,
        idAlumno: selectAlumno?.id,
      });
      const resultFechasTarea = await getFechasTarea(
        idGrado,
        idGrupo,
        idMateria,
        idUsuario,
        periodoEvaluacion?.fechaInicial,
        periodoEvaluacion?.fechaFinal
      );
      setTareas(resultTareas);
      setFechasTarea(resultFechasTarea);
      /**Proyectos */
      const resultProyectos = await calificacionProyecto({
        idUsuario,
        idMateria,
        idGrado,
        idGrupo,
        fechaInicial: periodoEvaluacion?.fechaInicial,
        fechaFinal: periodoEvaluacion?.fechaFinal,
        estatus: EstatusProyectoType.OK,
        idAlumno: selectAlumno?.id,
      });
      const resultFechasProyecto = await getFechasProyecto(
        idGrado,
        idGrupo,
        idMateria,
        idUsuario,
        periodoEvaluacion?.fechaInicial,
        periodoEvaluacion?.fechaFinal
      );
      setProyectos(resultProyectos);
      setFechasProyectos(resultFechasProyecto);
      const resultExamenes = await calificacionExamen({
        idUsuario,
        idMateria,
        idGrado,
        idGrupo,
        noPeriodo: periodoEvaluacion?.noPeriodo,
        estatus: EstatusExamenType.OK,
        idAlumno: selectAlumno?.id,
      });
      setExamenes(resultExamenes);

      /**Puntos extra */
      const resultPuntosExtra = await calificacionPuntoExtra({
        idUsuario,
        idMateria,
        idGrado,
        idGrupo,
        fechaInicial: periodoEvaluacion?.fechaInicial,
        fechaFinal: periodoEvaluacion?.fechaFinal,
        estatus: EstatusPuntoExtraType.OK,
        idAlumno: selectAlumno?.id,
      });
      setPuntosExtra(resultPuntosExtra);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDataPeriodos = async () => {
      fetchPeriodos();
    };
    if (selectAlumno !== undefined) {
      fetchDataPeriodos();
    }
  }, [selectAlumno]);

  return (
    <>
      <Loading isLoading={loading} />
      <div
        className={`mt-16 mr-4  
                ${isMenuVisible ? "ml-72" : "ml-4"}`}
      >
        <h3 className="mt-2  block text-gray-700 dark:text-gray-200 font-bold text-xl mb-2">
          Estadisticas individual
        </h3>
        <div className="mb-4">
          <InfoCardDateGGM grado={grado} grupo={grupo} materia={materia} />
        </div>
        <div
          className=" mt-2 pt-4 pb-4 pl-4 pr-4  rounded-lg shadow  
                 sm:max-w-full  dark:bg-[#18181B] bg-[#ffffff] mr-4 mb-14"
        >
          <div className="flex  gap-7">
            <div>
              <label
                className="block text-gray-700 dark:text-gray-200 font-bold text-md mb-2"
                htmlFor="lbl-f"
              >
                Codigo de barras, nombre y No. lista
              </label>

              <div className="relative w-full sm:max-w-md">
                <div className="relative flex items-center ">
                  <input
                    type="text"
                    id="text-grado"
                    ref={barcodeInputRef}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5
                  dark:bg-[#1a2c32] dark:border-gray-600 dark:text-white dark:placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-200"
                    placeholder=""
                    value={valueSearch}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg p-2.5 flex items-center justify-center"
                    aria-label="Buscar"
                    onClick={handleSearch}
                  >
                    <SvgIcons.Search />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <TableAlumnos alumnos={alumnos} setSelectAlumno={setSelectAlumno} />
          </div>
          <div>
            <StudentSelectCard student={selectAlumno} />
          </div>
          <div>
            <CardPeriodo
              periodos={periodos}
              setSelectedPeriodo={setSelectPeriodo}
              fetchFechas={fetchFechasCalificacion}
            />
          </div>

          {participacionesChecked.isChecked && participaciones.length > 0 && (
            <div>
              <TableParticipacion
                fechas={fechasParticipacion}
                participaciones={participaciones}
                valueParticipacion={participacionesChecked.value}
              />
            </div>
          )}

          {tareasChecked.isChecked && tareas.length > 0 && (
            <div>
              <TableTareas
                fechas={fechasTareas}
                tareas={tareas}
                valueTarea={tareasChecked.value}
              />
            </div>
          )}

          {proyectosChecked.isChecked && proyectos.length > 0 && (
            <div>
              <TableProyecto
                fechas={fechasProyectos}
                proyectos={proyectos}
                valueProyecto={proyectosChecked.value}
              />
            </div>
          )}
          {examenesChecked.isChecked && examenes.length > 0 && (
            <div>
              <TableExamen
                noPeriodo={selectPeriodo?.noPeriodo}
                examenes={examenes}
                valueExamen={examenesChecked.value}
              />
            </div>
          )}

          {isCheckedPuntosExtra && puntosExtra.length > 0 && (
            <TablePuntoExtras puntosExtra={puntosExtra} />
          )}
        </div>
      </div>
    </>
  );
}
