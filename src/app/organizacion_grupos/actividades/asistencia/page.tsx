"use client";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import { ItemStudentAsistencia, StudentAsitencia } from "@/app/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AsistenciaType } from "./types";

export default function Actividades() {
  const { grado, grupo, materia } = useSidebarContext();
  const [alumnos, setAlumnos] = useState<ItemStudentAsistencia[]>([]);
  const [alumnoselect, setAlumnoselect] = useState<ItemStudentAsistencia>();
  const [asistencias, setAsistencias] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [ARF, setARF] = useState<string>("A");

  const alumnosDePrueba: StudentAsitencia[] = [
    {
      id: "1",
      nombre: "Juan",
      apellidoPaterno: "Pérez",
      apellidoMaterno: "García",
      noLista: 1,
      foto: Buffer.from("foto_juan"),
    },
    {
      id: "2",
      nombre: "María",
      apellidoPaterno: "López",
      apellidoMaterno: "Rodríguez",
      noLista: 2,
      foto: Buffer.from("foto_maria"),
    },
    {
      id: "3",
      nombre: "Carlos",
      apellidoPaterno: "Martínez",
      apellidoMaterno: null,
      noLista: 3,
      foto: Buffer.from("foto_carlos"),
    },
    {
      id: "4",
      nombre: "Ana",
      apellidoPaterno: "Sánchez",
      apellidoMaterno: "Fernández",
      noLista: 4,
      foto: Buffer.from("foto_ana"),
    },
    {
      id: "5",
      nombre: "Pedro",
      apellidoPaterno: "González",
      apellidoMaterno: "Díaz",
      noLista: 5,
      foto: Buffer.from("foto_pedro"),
    },
  ];

  useEffect(() => {
    //setAlumnos(alumnosDePrueba);
   
  }, []);

  useEffect(() => {
    if (alumnos.length > 0) {
      setAlumnoselect(alumnos[currentIndex]);
    }
  }, [alumnos, currentIndex]);

  const handleNext = () => {
    if (currentIndex < alumnos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSaveData = () => {
    console.log("Saving data...");
  };

  const handleARF = (a: string) => {
    setARF(a);
    console.log("ARF " + a);
  };

  return (
    <>
      <label
        className="ml-72 md:mt-14 block text-gray-700 dark:text-gray-200 
                font-bold text-xl mb-2"
        htmlFor="lbl-date-start-end"
      >
        Asistencias
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
          Fecha{" "}
          <span className="font-normal text-sm"> 17 de junio del 2024</span>
        </label>
      </div>

      <div
        className="ml-72 mt-2 mr-4 pt-4 pb-4 pl-4 pr-4  rounded-lg shadow  
                    sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]"
      >
        <div className=" flex">
          <Image
            className="rounded-lg aspect-square object-cover"
            src="/profesor.jpg"
            alt="Foto"
            width={150}
            height={150}
            priority
          />
          <div className="pl-2">
            <div className="ps-3">
              <label
                className=" md:mt-2 block text-gray-700 dark:text-gray-200 
                                font-bold text-sm mb-2"
                htmlFor="lbl-date-start-end"
              >
                No. lista{" "}
                <span className="font-normal text-sm">
                  {" "}
                  {alumnoselect?.noLista}
                </span>
              </label>
              <div className="text-base font-semibold">
                {alumnoselect?.nombre}
              </div>
              <div className="font-normal text-gray-500">
                {alumnoselect?.apellidoPaterno} {alumnoselect?.apellidoMaterno}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex ml-32 mt-4 space-x-3 ">
            <div
              className={`px-6 py-3 rounded-full  cursor-pointer 
              ${ARF === AsistenciaType.A ? "dark:bg-[#1a2c32]" : ""}`}
              onClick={() => handleARF(AsistenciaType.A)}
            >
              <label
                className="  text-gray-700 dark:text-gray-200 
                                font-bold text-xl cursor-pointer"
                htmlFor="lbl-a"
                onClick={() => handleARF(AsistenciaType.A)}
              >
                A
              </label>
            </div>
            <div
              className={`px-6 py-3 rounded-full  cursor-pointer 
              ${ARF === AsistenciaType.R ? "dark:bg-[#1a2c32]" : ""}`}
              onClick={() => handleARF(AsistenciaType.R)}
            >
              <label
                className="  text-gray-700 dark:text-gray-200 
                                font-bold text-xl cursor-pointer"
                htmlFor="lbl-r"
                onClick={() => handleARF(AsistenciaType.R)}
              >
                R
              </label>
            </div>
            <div
              className={`px-6 py-3 rounded-full  cursor-pointer  
              ${ARF === AsistenciaType.F ? "dark:bg-[#1a2c32]" : ""}`}
              onClick={() => handleARF(AsistenciaType.F)}
            >
              <label
                className="  text-gray-700 dark:text-gray-200 
                                font-bold text-xl cursor-pointer"
                htmlFor="lbl-f"
                onClick={() => handleARF(AsistenciaType.F)}
              >
                F
              </label>
            </div>
          </div>
          <div className="flex space-x-3 mt-2">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`w-full mt-2 text-white bg-[#438e96] hover:bg-[#3b757f] 
              focus:ring-4 focus:outline-none focus:ring-blue-300 
              font-medium rounded-lg text-sm px-5 py-2.5 text-center 
              dark:bg-[#438e96] dark:hover:bg-[#3b757f] 
             ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Anterior
            </button>

            <button
              type="button"
              onClick={
                currentIndex === alumnos.length - 1
                  ? handleSaveData
                  : handleNext
              }
              className={`w-full mt-2 text-white bg-[#438e96] hover:bg-[#3b757f] 
              focus:ring-4 focus:outline-none focus:ring-blue-300 
              font-medium rounded-lg text-sm px-5 py-2.5 text-center 
              dark:bg-[#438e96] dark:hover:bg-[#3b757f] 
             `}
            >
              {currentIndex === alumnos.length - 1 ? "Finalizar" : "Siguiente"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
