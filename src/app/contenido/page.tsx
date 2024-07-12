"use client"
import { AuthCheck } from "../hooks/AuthCheck";
import { useSidebarContext } from "../sidebar/SidebarContext";
import ListItemContenido from "./components/ListItemContenido";
import ProgressBarContenido from "./components/ProgressBarContenido";


export default function Contenido() {
  const { isMenuVisible } = useSidebarContext();
  const items = [
    {
      text: "Maximo común divisor y mínimo común múltiplo",
      date: "19 de junio del 2024",
    },
    {
      text: "Números: operaciones con números enteros",
      date: "19 de junio del 2024",
    },
    {
      text: "Números: fracciones equivalente y adición y sustracción",
      date: "19 de junio del 2024",
    },
    {
      text: "Números: expresiones fraccionarias, decimales y porcentuale",
      date: "19 de junio del 2024",
    },
    {
      text: "Números: expresiones fraccionarias, decimales y porcentuale",
      date: "19 de junio del 2024",
    },
    {
      text: "Álgebra: proporcionalidad directa e inversa",
      date: "19 de junio del 2024",
    },
  ];

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
          Contenido de mes de junio
        </h3>
        <ProgressBarContenido progress={80} />
        <ul className="list-none pl-0">
          {items.map((item, index) => (
            <ListItemContenido
              key={index}
              text={item.text}
              isLast={index === items.length - 1}
              date={item.date}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
