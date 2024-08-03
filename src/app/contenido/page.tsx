"use client";
import { useState } from "react";
import { AuthCheck } from "../hooks/AuthCheck";
import { useSidebarContext } from "../sidebar/SidebarContext";
import ListItemContenido from "./components/ListItemContenido";
import ProgressBarContenido from "./components/ProgressBarContenido";
import useCronogramas from "./hooks/useCronograma";
import { Cronograma } from "../types/cronograma/TypeCronograma";
import { v4 as uuidv4 } from "uuid";

export default function Contenido() {
  const { isMenuVisible } = useSidebarContext();

  const [isFetch, setIsFetch] = useState<boolean>(true);
  const [cronogramas, setCronogramas] = useState<Cronograma[] | null>(null);
  const [loading, setLoading] = useState(true);

  useCronogramas({ setLoading, isFetch, setIsFetch, setCronogramas });

  return (
    <div
      className={`mt-16 mr-4
      ${isMenuVisible ? "ml-72" : "ml-4"}`}
    >
      <AuthCheck />
      <div
        className=" rounded-lg shadow  
                        sm:max-w-full  dark:bg-[#18181B] bg-[#ffffff] p-5"
      >
        <h3 className=" block text-gray-400 dark:text-gray-500 font-bold text-xl mb-2">
          Presentar el siguiente contenido.
        </h3>
        <h3 className=" block text-gray-700 dark:text-gray-200 font-bold text-xl ">
          Maximo común divisor y mínimo común múltiplo
        </h3>
      </div>

      <div
        className=" rounded-lg shadow  
                        sm:max-w-full  dark:bg-[#18181B] bg-[#ffffff] p-5 mt-4"
      >
        <h3 className=" block text-gray-400 dark:text-gray-500 font-bold text-xl mb-3">
          Contenido 
        </h3>
        <ProgressBarContenido progress={80} />
        <ul className="list-none pl-0">
          {cronogramas?.map((cronograma, index) => (
            <ListItemContenido
              key={uuidv4()}
              text={cronograma.contenido}
              isLast={index === cronogramas.length - 1}
              dateStart={cronograma.fechaInicial}
              dateEnd={cronograma.fechaFinal}
              estadoClase={cronograma.estadoClase}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
