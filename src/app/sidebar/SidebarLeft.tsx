"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useSidebarContext } from "./SidebarContext";
import { v4 as uuidv4 } from "uuid";

export default function SidebarLeft() {
  const [selectedOrganizacionGrupos, setSelectedOrganizacionGrupos] = useState<
    number | null
  >(null);
  const [selectedConfiguration, setSelectedConfiguration] = useState<
    number | null
  >(null);
  const [visibleitemIndex, setVisibleitemIndex] = useState<number | null>(null);
  const { idGrado, idGrupo, idMateria, updateContextField, isMenuVisible } =
    useSidebarContext();

  const handleClickSelectedConfiguration = (index: number) => {
    setSelectedConfiguration(index);
  };

  const handleClickSelectedPlanning = (index: number) => {
    setSelectedOrganizacionGrupos(index);
  };
  const handleClickConfiguration = (index: number) => {
    setVisibleitemIndex(index === visibleitemIndex ? null : index);
  };

  const handleOcultarSetVisibleitemIndex = () => {
    setVisibleitemIndex(-1);
  };

  const toggleMenu = () => {
    updateContextField("isMenuVisible", !isMenuVisible);
  };

  const menuOrganizacionGrupos = [
    {
      name: "Actividades de evaluación formativa ",
      href: "/organizacion_grupos/actividades",
      icon: "/grados.svg",
    },
  ];

  const menuItemsConfiguration = [
    { name: "Grado", href: "/configuration/grado", icon: "/grados.svg" },
    { name: "Grupo", href: "/configuration/grupo", icon: "/grupos.svg" },
    { name: "Materia", href: "/configuration/materia", icon: "/materias.svg" },
    {
      name: "Alumnos",
      href:
        idGrado !== -1 && idGrupo !== -1 && idMateria !== -1
          ? "/configuration/alumnos"
          : "/error_selection",
      icon: "/grados.svg",
    },
    { name: "Fechas", href: "/configuration/fechas", icon: "/grados.svg" },
    {
      name: "Encuadre calificación",
      href:
        idGrado !== -1 && idGrupo !== -1 && idMateria !== -1
          ? "/configuration/encuadre_calificacion"
          : "/error_selection",
      icon: "/grados.svg",
    },
  ];

  return (
    <>
      <button
        onClick={toggleMenu}
        className="fixed top-2 left-2 z-50 p-2 bg-[#356169] dark:bg-[#1a2c32]
         text-white rounded-md"
      >
        {"☰"}
      </button>
      <div
        className={`fixed top-12 left-0 h-full w-64 text-gray-100 dark:text-white
          dark:bg-[#1a2c32] bg-[#356169] transition-transform duration-300 ease-in-out
          ${isMenuVisible ? "translate-x-0" : "-translate-x-full"}`}
      >
        <ul className="mt-4">
          <Link
            className=""
            key="contenido"
            href={
              idGrado !== -1 && idGrupo !== -1 && idMateria !== -1
                ? "/contenido"
                : "/error_selection"
            }
            onClick={handleOcultarSetVisibleitemIndex}
          >
            <li className="flex space-x-2 px-4 py-2 text-sm ">
              <Image
                className="dark:filter dark:invert dark:opacity-75 opacity-70 filter invert mr-3"
                src="/contenido.svg"
                width={24}
                height={24}
                alt=""
              />

              <span className="opacity-80">Contenido</span>
            </li>
          </Link>
          <Link
            className=""
            key="mat-didactico"
            href={
              idGrado !== -1 && idGrupo !== -1 && idMateria !== -1
                ? "/material_didactico"
                : "/error_selection"
            }
            onClick={handleOcultarSetVisibleitemIndex}
          >
            <li className="flex space-x-2  px-4 py-2 text-sm ">
              <Image
                className="dark:filter dark:invert dark:opacity-75 opacity-70 filter invert mr-3"
                src="/iconos/sidebar/mat_didactico.svg"
                width={24}
                height={24}
                alt=""
              />
              <span className="opacity-80">Material didáctico</span>
            </li>
          </Link>
          <li className="block px-4  text-sm cursor-pointer">
            <div className="flex space-x-2">
              <Image
                className="dark:filter dark:invert dark:opacity-75 opacity-70 filter invert  mr-3"
                src="/iconos/sidebar/grupos.svg"
                width={24}
                height={24}
                alt=""
              />
              <button
                className="text-left cursor-pointer"
                onClick={() => handleClickConfiguration(0)}
              >
                <span className="opacity-80"> Organización de mis grupos</span>
              </button>
            </div>

            {visibleitemIndex === 0 && (
              <ul>
                {menuOrganizacionGrupos.map((item, index) => (
                  <li
                    key={uuidv4()}
                    className={`block mr-4 rounded-lg ${
                      selectedOrganizacionGrupos === index
                        ? "bg-gray-600"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    <Link
                      className="flex items-center space-x-4 pl-4 pt-3 pb-3 pr-3"
                      href={
                        idGrado !== -1 && idGrupo !== -1 && idMateria !== -1
                          ? item.href
                          : "/error_selection"
                      }
                      onClick={(e) => {
                        handleClickSelectedPlanning(index);
                        e.stopPropagation();
                      }}
                    >
                      <Image
                        className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none mr-3"
                        src={item.icon}
                        width={24}
                        height={24}
                        alt=""
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="pl-4 pt-3 text-sm">
            <div className="flex space-x-2">
              <Image
                className="dark:filter dark:invert dark:opacity-75 opacity-70 filter invert  mr-3"
                src="/iconos/sidebar/configuration.svg"
                width={24}
                height={24}
                alt=""
              />
              <button
                className="w-full text-left cursor-pointer"
                onClick={() => handleClickConfiguration(1)}
              >
                <span className="opacity-80"> Configuración</span>
              </button>
            </div>

            {visibleitemIndex === 1 && (
              <ul>
                {menuItemsConfiguration.map((item, index) => (
                  <button
                    key={uuidv4()}
                    className={`block mr-4 rounded-lg ${
                      selectedConfiguration === index
                        ? "bg-gray-600"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={(e) => {
                      handleClickSelectedConfiguration(index);
                      e.stopPropagation();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleClickSelectedConfiguration(index);
                        e.preventDefault();
                      }
                    }}
                  >
                    <Link
                      className="flex items-center space-x-4 pl-4 pt-3 pb-3 pr-3"
                      key={uuidv4()}
                      href={item.href}
                    >
                      <Image
                        className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none mr-3"
                        src={item.icon}
                        width={24}
                        height={24}
                        alt=""
                      />
                      {item.name}
                    </Link>
                  </button>
                ))}
              </ul>
            )}
          </li>

          <Link
            className=""
            key="productos_evaluacion"
            href={
              idGrado !== -1 && idGrupo !== -1 && idMateria !== -1
                ? "/productos_evaluacion"
                : "/error_selection"
            }
            onClick={handleOcultarSetVisibleitemIndex}
          >
            <li className=" pl-4 pt-3 text-sm">
              <div className="flex space-x-2">
                <Image
                  className="dark:filter dark:invert dark:opacity-75 opacity-70 filter invert  mr-3"
                  src="/iconos/sidebar/productos.svg"
                  width={24}
                  height={24}
                  alt=""
                />
                <span className="opacity-80">
                  {" "}
                  Productos de evaluación formativa
                </span>
              </div>
            </li>
          </Link>
          <Link
            className=""
            key="cronogramas"
            href={
              idGrado !== -1 && idGrupo !== -1 && idMateria !== -1
                ? "/cronogramas"
                : "/error_selection"
            }
            onClick={handleOcultarSetVisibleitemIndex}
          >
            <li className=" pl-4 pt-3 text-sm ">
              <div className="flex space-x-2">
                <Image
                  className="dark:filter dark:invert dark:opacity-75 opacity-70 filter invert  mr-3"
                  src="/iconos/sidebar/cronogramas.svg"
                  width={24}
                  height={24}
                  alt=""
                />
                <span className="opacity-80"> Cronogramas</span>
              </div>
            </li>
          </Link>
          <Link
            className=""
            key="organizacion_material_didactico"
            href={
              idGrado !== -1 && idGrupo !== -1 && idMateria !== -1
                ? "/organizacion_material_didactico"
                : "/error_selection"
            }
            onClick={handleOcultarSetVisibleitemIndex}
          >
            <li className="block px-4 py-2 text-sm">
              <div className="flex space-x-2">
                <Image
                  className="dark:filter dark:invert dark:opacity-75 opacity-70 filter invert  mr-3"
                  src="/iconos/sidebar/organizacion.svg"
                  width={24}
                  height={24}
                  alt=""
                />
                <span className="opacity-80">
                  Organización material didáctico
                </span>
              </div>
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}
