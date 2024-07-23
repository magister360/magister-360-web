"use client";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";

import { useEffect, useRef, useState } from "react";

import { StudentExamen, StudentParticipacion } from "@/app/types/types";

import { SvgIcons } from "@/app/svg/SvgIcons";
import Loading from "@/app/components/Loading";
import { AuthCheck } from "@/app/hooks/AuthCheck";
import { PeriodoEvaluacion } from "@/app/types/periodos_evaluacion/TypePeriodosEvaluacion";
import { EstatusFechaPeriodosType } from "@/app/estatus/EstatusType";
import InfoCardDateGGM from "@/app/components/InfoCardDateGGM";
import { getAlumnosExamen, getPeriodosExamenAlumno } from "./controller/SegExamenService";
import { getPeriodos } from "@/app/controller/PeriodosController";
import TableExamenSeguimiento from "./conponents/TableExamenSeguimiento";
import StudentSelectCard from "./conponents/StudentSelectCard";
import CardPeriodo from "@/app/components/CardPeriodo";
import PeriodosExamenes from "./conponents/PeriodosExamenes";
import { TypeExamenPeriodo } from "@/app/types/examen/TypeExamen";

export default function Seguimiento() {
  const [valueSearch, setValueSearch] = useState("");
  const [alumnos, setAlumnos] = useState<StudentExamen[]>([]);
  const [selectAlumno, setSelectAlumno] = useState<
    StudentParticipacion | undefined
  >(undefined);
  const barcodeInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [periodos, setPeriodos] = useState<PeriodoEvaluacion[] | null>(null);
  const [selectPeriodo, setSelectPeriodo] = useState<PeriodoEvaluacion | null>(
    null
  );

  const [examenesAlumno, setExamenesAlumno] = useState<
    TypeExamenPeriodo[] | null
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

  const fetchPeriodosExamenes = async (
    periodoEvaluacion: PeriodoEvaluacion | null
  ) => {
    const examenAlumnos = await getPeriodosExamenAlumno(
      idMateria,
      idUsuario,
      selectAlumno?.id,
      periodoEvaluacion?.noPeriodo
    );
    setExamenesAlumno(examenAlumnos);
  };

  const fetchPeriodos = async () => {
    setLoading(true);

    try {
      const result = await getPeriodos(
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
      fetchAlumnoExamen(valueSearch);
      setValueSearch("");
    }
  };

  const handleSearch = async () => {
    fetchAlumnoExamen(valueSearch);
  };

  const fetchAlumnoExamen = async (busqueda: string) => {
    const userId = idUsuario ?? -1;
    const result = await getAlumnosExamen(
      userId,
      0,
      idGrado ?? -1,
      idGrupo ?? -1,
      busqueda,
      idMateria ?? -1
    );
    //console.log(result)
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
        Seguimiento examenes
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
        <TableExamenSeguimiento
            alumnos={alumnos}
            setSelectAlumno={setSelectAlumno}
           // setFechasExamenes={setFechasExamenes}
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
            fetchFechas={fetchPeriodosExamenes}
          />
        </div>
        <div className="mt-6">
          <PeriodosExamenes
            noPeriodo={selectPeriodo?.noPeriodo}
            examenesAlumno={examenesAlumno}
            fetchPeriodosExamen={fetchPeriodosExamenes}
            selectPeriodo={selectPeriodo}
            idAlumno={selectAlumno?.id}
          />
        </div>
      </div>
    </div>
  );
}
