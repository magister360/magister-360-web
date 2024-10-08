"use client";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";

import { useEffect, useRef, useState } from "react";

import { SvgIcons } from "@/app/svg/SvgIcons";
import Loading from "@/app/components/Loading";
import { AuthCheck } from "@/app/hooks/AuthCheck";
import { PeriodoEvaluacion } from "@/app/types/periodos_evaluacion/TypePeriodosEvaluacion";
import { EstatusFechaPeriodosType } from "@/app/estatus/EstatusType";
import {
  StudentProyecto,
  TypeProyectoFecha,
} from "@/app/types/proyecto/TypeProyecto";
import {
  getAlumnosProyecto,
  getFechasProyecto,
  getFechasProyectoAlumno,
} from "./controller/SegProyectoController";
import { getFechasPeriodos } from "@/app/controller/PeriodosEvaluacionController";
import TableProyectoSeguimiento from "./conponents/TableProyectoSeguimiento";
import StudentSelectCard from "./conponents/StudentSelectCard";
import FechasProyectos from "./conponents/FechasProyecto";
import InfoCardDateGGM from "@/app/components/InfoCardDateGGM";
import CardPeriodo from "@/app/components/CardPeriodo";

export default function Seguimiento() {
  const [valueSearch, setValueSearch] = useState("");
  const [alumnos, setAlumnos] = useState<StudentProyecto[]>([]);
  const [selectAlumno, setSelectAlumno] = useState<StudentProyecto | undefined>(
    undefined
  );
  const barcodeInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [periodos, setPeriodos] = useState<PeriodoEvaluacion[] | null>(null);
  const [selectPeriodo, setSelectPeriodo] = useState<PeriodoEvaluacion | null>(
    null
  );
  const [fechasProyectos, setFechasProyectos] = useState<string[] | null>([]);
  const [proyectosAlumno, setProyectosAlumno] = useState<
    TypeProyectoFecha[] | null
  >([]);

  const {
    isMenuVisible,
    grado,
    grupo,
    materia,
    idGrado,
    idGrupo,
    idMateria,
    idUsuario,
  } = useSidebarContext();

  const fetchFechasProyecto = async (
    periodoEvaluacion: PeriodoEvaluacion | null
  ) => {
    const fechas = await getFechasProyecto(
      idGrado,
      idGrupo,
      idMateria,
      idUsuario,
      periodoEvaluacion?.fechaInicial,
      periodoEvaluacion?.fechaFinal
    );
    setFechasProyectos(fechas);

    const proyectoAlumnos = await getFechasProyectoAlumno(
      idMateria,
      idUsuario,
      selectAlumno?.id,
      periodoEvaluacion?.fechaInicial,
      periodoEvaluacion?.fechaFinal
    );
    setProyectosAlumno(proyectoAlumnos);
  };

  const fetchPeriodos = async () => {
    setLoading(true);

    try {
      const result = await getFechasPeriodos(
        idUsuario ?? -1,
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(event.target.value);
  };

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      fetchAlumnoProyecto(valueSearch);
      setValueSearch("");
    }
  };

  const handleSearch = async () => {
    fetchAlumnoProyecto(valueSearch);
  };

  const fetchAlumnoProyecto = async (busqueda: string) => {
    const userId = idUsuario ?? -1;
    const result = await getAlumnosProyecto(
      userId,
      0,
      idGrado ?? -1,
      idGrupo ?? -1,
      busqueda,
      idMateria ?? -1
    );
    setAlumnos(result);
  };

  useEffect(() => {
    const fetchDataPeriodos = async () => {
      fetchPeriodos();
    };
    if (selectAlumno !== undefined) {
      fetchDataPeriodos();
    }
  }, [selectAlumno]);

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  if (idUsuario === undefined) {
    return <AuthCheck />;
  }

  return (
    <div
      className={`mt-16 mr-4  
                ${isMenuVisible ? "ml-72" : "ml-4"}`}
    >
      <h3
        className=" md:mt-14 block text-gray-700 dark:text-gray-200 
                font-bold text-xl mb-2"
      >
        Seguimiento proyecto
      </h3>

      <InfoCardDateGGM grado={grado} grupo={grupo} materia={materia} />

      <div
        className=" mt-2 pt-4 pb-4 pl-4 pr-4  rounded-lg shadow  
                 sm:max-w-full  dark:bg-[#18181B] bg-[#ffffff] mr-4"
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
              <div className="relative flex items-center">
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
        <div>
          <TableProyectoSeguimiento
            alumnos={alumnos}
            setSelectAlumno={setSelectAlumno}
            setFechasProyectos={setFechasProyectos}
            setSelectPeriodo={setSelectPeriodo}
          />
        </div>
        <div>
          <StudentSelectCard student={selectAlumno} />
        </div>
        <div>
          <CardPeriodo
            periodos={periodos}
            setSelectedPeriodo={setSelectPeriodo}
            fetchFechas={fetchFechasProyecto}
          />
        </div>
        <div className="mt-6">
          <FechasProyectos
            fechasProyectos={fechasProyectos}
            noPeriodo={selectPeriodo?.noPeriodo}
            proyectosAlumno={proyectosAlumno}
            fetchFechasProyecto={fetchFechasProyecto}
            selectPeriodo={selectPeriodo}
            idAlumno={selectAlumno?.id}
          />
        </div>
      </div>
    </div>
  );
}
