"use client";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDateLocale } from "@/app/utils/DateUtils";
import InfoCardDateGGM from "@/app/components/InfoCardDateGGM";
import { useAlumnosAsistenciaHook } from "./hooks/useAlumnosAsistenciaHook";
import { EstatusAsistenciaType } from "@/app/estatus/EstatusType";
import { AsistenciaType } from "./types";
import {
  createAsistencias,
} from "./controller/AsistenciaController";
import ErrorModal from "@/app/components/ErrorModal ";
import SuccessModal from "@/app/components/SuccessModal";

export default function Asistencias() {
  const router = useRouter();
  const {
    grado,
    grupo,
    materia,
    idUsuario,
    idGrado,
    idGrupo,
    idMateria,
    isMenuVisible,
  } = useSidebarContext();
  const searchParams = useSearchParams();

  const [date, setDate] = useState<string | null>(null);
  const [dateFormatStr, setDateFormatStr] = useState<string | null>(null);
  const [orderStudents, setOrderStudents] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };
  const handleSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  useEffect(() => {
    if (searchParams) {
      const dateParam = searchParams.get("date");
      const orderStudentsParam = searchParams.get("orderStudents");
      if (dateParam) {
        setDate(dateParam);
        const formatDateStr = formatDateLocale(dateParam);
        setDateFormatStr(formatDateStr);
      }
      if (orderStudentsParam) {
        setOrderStudents(orderStudentsParam);
      }
    }
  }, [searchParams]);

  const { alumnosA, alumnoSelect, setAlumnosA, setAlumnoSelect } =
    useAlumnosAsistenciaHook(
      idUsuario,
      EstatusAsistenciaType.OK,
      idGrado,
      idGrupo,
      idMateria,
      setLoading,
      orderStudents,
      currentIndex
    );

  const handleSaveData = async () => {

      const save = await createAsistencias(
        alumnosA,
        idUsuario,
        idMateria,
        date,
        EstatusAsistenciaType.OK
      );
      if (save.isSave) {
        setSuccessMessage(save.message);
        setIsSuccessModalOpen(true);
        router.push("/organizacion_grupos/actividades/asistencia/select_fecha/manual");
      } else {
        setErrorMessage(save.message);
        setIsErrorModalOpen(true);
      }
    
  };

  const handleAsistenciaChange = (
    id: string | undefined,
    nuevaAsistencia: string
  ) => {
    setAlumnosA((prevAlumnos) =>
      prevAlumnos?.map((alumno) =>
        alumno.id === id ? { ...alumno, asistencia: nuevaAsistencia } : alumno
      )
    );
  };

  const handleNext = () => {
    if (alumnosA !== undefined && currentIndex < alumnosA?.length - 1) {
      setAlumnoSelect(alumnosA[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (alumnosA !== undefined && currentIndex > 0) {
      setAlumnoSelect(alumnosA[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (isErrorModalOpen) {
    return (
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    );
  }
  if (isSuccessModalOpen) {
    return (
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModal}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
      />
    );
  }

  return (
    <div
      className={`mt-16 mr-4  
    ${isMenuVisible ? "ml-72" : "ml-4"}`}
    >
      <h2
        className="md:mt-14 block text-gray-700 dark:text-gray-200 
                font-bold text-xl mb-2"
      >
        Asistencias
      </h2>

      <InfoCardDateGGM
        dateFormatStr={dateFormatStr}
        grado={grado}
        grupo={grupo}
        materia={materia}
      />

      <div
        className=" mt-2 mr-4 pt-4 pb-4 pl-4 pr-4  rounded-lg shadow  
                    sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]"
      >
        <div className=" flex">
          <Image
            className="rounded-lg aspect-square object-cover"
            src="/notPhoto.PNG"
            alt="Foto"
            width={150}
            height={150}
            priority
          />
          <div className="pl-2">
            <div className="ps-3">
              <div
                className=" md:mt-2 block text-gray-700 dark:text-gray-200 
                                font-bold text-sm mb-2"
              >
                <span className="font-normal text-sm">No. lista </span>

                <span className="font-normal text-sm">
                  {" "}
                  {alumnoSelect?.noLista}
                </span>
              </div>
              <div className="text-base font-semibold">
                {alumnoSelect?.nombre}
              </div>
              <div className="font-normal text-gray-500">
                {alumnoSelect?.apellidoPaterno} {alumnoSelect?.apellidoMaterno}
              </div>
            </div>
          </div>
        </div>
        <div className="flex ml-32 mt-4 space-x-3 ">
          <button
            className={`px-6 py-3 rounded-full  cursor-pointer text-white text-xl
              ${
                alumnoSelect?.asistencia === AsistenciaType.A
                  ? "dark:bg-blue-700 bg-blue-500 "
                  : ""
              }`}
            onClick={() =>
              handleAsistenciaChange(alumnoSelect?.id, AsistenciaType.A)
            }
          >
            A
          </button>
          <button
            className={`px-6 py-3 rounded-full  cursor-pointer text-white text-xl
              ${
                alumnoSelect?.asistencia === AsistenciaType.R
                  ? "dark:bg-blue-700 bg-blue-500 "
                  : ""
              }`}
            onClick={() =>
              handleAsistenciaChange(alumnoSelect?.id, AsistenciaType.R)
            }
          >
            R
          </button>
          <button
            className={`px-6 py-3 rounded-full  cursor-pointer text-white text-xl
              ${
                alumnoSelect?.asistencia === AsistenciaType.F
                  ? "dark:bg-blue-700 bg-blue-500 "
                  : ""
              }`}
            onClick={() =>
              handleAsistenciaChange(alumnoSelect?.id, AsistenciaType.F)
            }
          >
            F
          </button>
        </div>
        <div className="flex space-x-3 mt-2">
          <button
            type="button"
            className={`w-full mt-2 text-white bg-[#438e96] hover:bg-[#3b757f] 
              focus:ring-4 focus:outline-none focus:ring-blue-300 
              font-medium rounded-lg text-sm px-5 py-2.5 text-center 
              dark:bg-[hsl(186,38%,43%)] dark:hover:bg-[#3b757f] 
              ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => {
              handlePrevious();
            }}
          >
            Anterior
          </button>
          <button
            type="button"
            onClick={() => {
              if (alumnosA !== undefined) {
                if (currentIndex === alumnosA?.length - 1) {
                  handleSaveData();
                } else {
                  handleNext();
                }
              }
            }}
            className={`w-full mt-2 text-white bg-[#438e96] hover:bg-[#3b757f] 
              focus:ring-4 focus:outline-none focus:ring-blue-300 
              font-medium rounded-lg text-sm px-5 py-2.5 text-center 
              dark:bg-[#438e96] dark:hover:bg-[#3b757f] 
             `}
          >
            {alumnosA !== undefined && currentIndex === alumnosA?.length - 1
              ? "Finalizar"
              : "Siguiente"}
          </button>
        </div>
      </div>
    </div>
  );
}
