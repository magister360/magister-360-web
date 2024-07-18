"use client";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import {
  getAlumnosParticipacion,
  getFechasParticipacion,
  getFechasParticipacionAlumno,
} from "./controller/SegParticipacionController";
import { useEffect, useRef, useState } from "react";

import { StudentParticipacion } from "@/app/types/types";
import TableParticipacionSeguimiento from "./components/TableParticipacionSegimiento";
import StudentSelectCard from "./components/StudentSelectCard";
import { SvgIcons } from "@/app/svg/SvgIcons";
import Loading from "@/app/components/Loading";
import { AuthCheck } from "@/app/hooks/AuthCheck";
import { PeriodoEvaluacion } from "@/app/types/periodos_evaluacion/TypePeriodosEvaluacion";
import { getFechasPeriodos } from "./controller/PeriodosEvaluacionController";
import { EstatusFechaPeriodosType } from "@/app/estatus/EstatusType";
import PeriodoCard from "./components/PeriodoCard";
import FechasParticipaciones from "./components/FechasParticipaciones";
import { TypeParticipacion } from "@/app/types/participacion/TypeParticipacion";

export default function Seguimiento() {
  const [valueSearch, setValueSearch] = useState("");
  const [alumnos, setAlumnos] = useState<StudentParticipacion[]>([]);
  const [selectAlumno, setSelectAlumno] = useState<
    StudentParticipacion | undefined
  >(undefined);
  const barcodeInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [periodos, setPeriodos] = useState<PeriodoEvaluacion[] | null>(null);
  const [selectPeriodo, setSelectPeriodo] = useState<PeriodoEvaluacion | null>(
    null
  );
  const [fechasParticipaciones, setFechasParticipaciones] = useState<
    string[] | null
  >([]);
  const [participacionesAlumno, setParticipacionesAlumno] = useState<
    TypeParticipacion[] | null
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

  const fetchFechasParticipacion = async (
    periodoEvaluacion: PeriodoEvaluacion | null
  ) => {
    const fechas = await getFechasParticipacion(
      idMateria,
      idUsuario,
      periodoEvaluacion?.fechaInicial,
      periodoEvaluacion?.fechaFinal
    );
    setFechasParticipaciones(fechas);

    const participacionAlumnos = await getFechasParticipacionAlumno(
      idMateria,
      idUsuario,
      selectAlumno?.id,
      periodoEvaluacion?.fechaInicial,
      periodoEvaluacion?.fechaFinal
    );
    setParticipacionesAlumno(participacionAlumnos);
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
      fetchAlumnoParticipacion(valueSearch);
      setValueSearch("");
    }
  };

  const handleSearch = async () => {
    fetchAlumnoParticipacion(valueSearch);
  };

  const fetchAlumnoParticipacion = async (busqueda: string) => {
    const userId = idUsuario ?? -1;
    const result = await getAlumnosParticipacion(
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
        Seguimiento participación
      </h3>

      <div className="flex space-x-2">
        <div className=" px-5 py-2.5 rounded-lg dark:bg-[#1a2c32] bg-[#93c8cd]">
          <label
            className="block text-gray-700 dark:text-gray-200 font-bold text-md mb-2"
            htmlFor="lbl-date-start-end"
          >
            Grado: <span className="font-normal text-sm"> {grado}</span>
          </label>
        </div>

        <div className=" px-5 py-2.5 rounded-lg dark:bg-[#1a2c32] bg-[#93c8cd]">
          <label
            className="block text-gray-700 dark:text-gray-200 font-bold 
                        text-md mb-2"
            htmlFor="lbl-date-start-end"
          >
            Grupo: <span className="font-normal text-sm"> {grupo}</span>
          </label>
        </div>

        <div className=" px-5 py-2.5 rounded-lg dark:bg-[#1a2c32] bg-[#93c8cd]">
          <label
            className="block text-gray-700 dark:text-gray-200 font-bold text-md mb-2"
            htmlFor="lbl-date-start-end"
          >
            Materia: <span className="font-normal text-sm"> {materia}</span>
          </label>
        </div>
      </div>

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
          <TableParticipacionSeguimiento
            alumnos={alumnos}
            setSelectAlumno={setSelectAlumno}
            setFechasParticipaciones={setFechasParticipaciones}
            setSelectPeriodo={setSelectPeriodo}
          />
        </div>
        <div>
          <StudentSelectCard student={selectAlumno} />
        </div>
        <div>
          <PeriodoCard
            periodos={periodos}
            setSelectedPeriodo={setSelectPeriodo}
            fetchFechasParticipacion={fetchFechasParticipacion}
          />
        </div>
        <div className="mt-6">
          <FechasParticipaciones
            fechasParticipaciones={fechasParticipaciones}
            noPeriodo={selectPeriodo?.noPeriodo}
            participacionesAlumno={participacionesAlumno}
            fetchFechasParticipacion={fetchFechasParticipacion}
            selectPeriodo={selectPeriodo}
            idAlumno={selectAlumno?.id}
          />
        </div>
      </div>
    </div>
  );
}
