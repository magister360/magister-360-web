"use client";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import Image from "next/image";
import { getAlumnosParticipacion } from "./controller/SegParticipacionController";
import { useRef, useState } from "react";
import { SvgIcons } from "@/app/svg/SvgIcons";
import TableParticipacionSeguimiento from "./components/TableParticipacionSegimiento";
import { StudentParticipacion } from "@/app/types/types";

export default function Seguimiento() {
  const [valueSearch, setValueSearch] = useState("");
  const [alumnos, setAlumnos] = useState<StudentParticipacion[]>([]);
  const barcodeInputRef = useRef<HTMLInputElement>(null);

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
    console.log(result);
  };

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
          <TableParticipacionSeguimiento alumnos={alumnos} />
        </div>
      </div>
    </div>
  );
}
