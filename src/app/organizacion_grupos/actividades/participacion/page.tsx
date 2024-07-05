"use client";
import Image from "next/image";
import TableAlumnosParticipacion from "./components/TableAlumnosParticipacion";
import { useSearchParams, usePathname } from "next/navigation";
import { formatDateLocale } from "@/app/utils/DateUtils";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import React, { useState, KeyboardEvent, useEffect, useRef } from "react";
import {
  createParticipacion,
  getParticipacion,
} from "./controller/ParticipacionController";
import { v4 as uuidv4 } from "uuid";
import ErrorModal from "@/app/components/ErrorModal ";
import SuccessNameModal from "./components/SuccessNameModal";
import {
  ItemStudentParticipacion,
  StudentParticipacion,
} from "@/app/types/types";
import Contenido from "@/app/contenido/page";

export default function Participacion() {
  const searchParams = useSearchParams();
  const [date, setDate] = useState<string | null>(null);
  const [dateFormatStr, setDateFormatStr] = useState<string | null>(null);
  const { grado, grupo, materia } = useSidebarContext();
  const [barcode, setBarcode] = useState("");
  const { idUsuario, idMateria, contenido } = useSidebarContext();

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nombre, setNombre] = useState("");
  const [alumnos, setAlumnos] = useState<ItemStudentParticipacion[]>([]);
  const [calificacion, setCalificacion] = useState(10);

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };
  const handleSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBarcode(event.target.value);
  };

  function addStudent(studentParticipacion: StudentParticipacion) {
    if (studentParticipacion) {
      const newStudent: ItemStudentParticipacion = {
        ...studentParticipacion,
        calificacion: calificacion,
      };
      setAlumnos((prevAlumnos) => [...prevAlumnos, newStudent]);
    }
  }

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const UUID = uuidv4();
      const userId = idUsuario ?? -1;
      const studentParticipacion = await getParticipacion(
        userId,
        idMateria,
        barcode,
        date
      );
      if (!studentParticipacion) {
        setErrorMessage("Error al guardar la participación");
        setIsErrorModalOpen(true);
      } else {
        addStudent(studentParticipacion);
        setNombre(
          `${studentParticipacion.nombre} 
          ${studentParticipacion.apellidoPaterno} 
          ${studentParticipacion.apellidoMaterno}`
        );
        const save = await createParticipacion(
          UUID,
          date,
          calificacion,
          contenido ? contenido : "",
          studentParticipacion.id,
          userId,
          idMateria
        );
        if (save.isSave) {
          setSuccessMessage(save.message);
          setIsSuccessModalOpen(true);
        } else {
          setErrorMessage(save.message);
          setIsErrorModalOpen(true);
        }
      }

      setBarcode("");
    }
  };

  useEffect(() => {
    if (searchParams) {
      const dateParam = searchParams.get("date");
      if (dateParam) {
        setDate(dateParam);
        const formatDateStr = formatDateLocale(dateParam);
        setDateFormatStr(formatDateStr);
      }
    }
  }, [searchParams]);

  return (
    <>
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <SuccessNameModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModal}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
        name={nombre}
      />
      <label
        className="ml-72 md:mt-14 block text-gray-700 dark:text-gray-200 
                font-bold text-xl mb-2"
        htmlFor="lbl-date-start-end"
      >
        Participación
      </label>

      <div
        className="ml-72 mt-2 pt-4 pb-4 pl-4 pr-4  rounded-lg shadow  
                 sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]"
      >
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
        <label
          className=" md:mt-2 block text-gray-700 dark:text-gray-200 
                    font-bold text-sm mb-2"
          htmlFor="lbl-date-start-end"
        >
          Fecha: <span className="font-normal text-sm"> {dateFormatStr}</span>
        </label>
      </div>
      {contenido && (
        <div
          className="ml-72 mt-2 pt-4 pb-4 pl-4 pr-4  rounded-lg shadow  
                 sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]"
        >
          <label
            className="block text-gray-700 dark:text-gray-200 font-bold text-md mb-2"
            htmlFor="lbl-f"
          >
            <>
              Contenido
              <h2 className="font-light text-base">{contenido}</h2>
            </>
          </label>
        </div>
      )}
      <div
        className="ml-72 mt-2 pt-4 pb-4 pl-4 pr-4  rounded-lg shadow  
                 sm:max-w-full  dark:bg-[#18181B] bg-[#ffffff] mr-4"
      >
        <label
          className="block text-gray-700 dark:text-gray-200 font-bold text-md mb-2"
          htmlFor="lbl-f"
        >
          Codigo de barras
        </label>

        <div className="relative w-full sm:max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Image
              className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none w-auto h-7"
              src="/barcode.svg"
              alt="barcode"
              width={28}
              height={28}
            />
          </div>
          <input
            type="text"
            id="text-grado"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
             rounded-lg block w-full pl-14 p-2.5 
             dark:bg-[#1a2c32] dark:border-gray-600 dark:text-white 
             dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
             dark:focus:ring-blue-500 dark:focus:border-transparent
             transition-all duration-200"
            placeholder=""
            value={barcode}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </div>

        <TableAlumnosParticipacion alumnos={alumnos} errorEncabezado="" />
      </div>
    </>
  );
}
