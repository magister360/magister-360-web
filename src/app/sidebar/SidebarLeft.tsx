"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function SidebarLeft() {
  const [selectedOrganizacionGrupos, setSelectedOrganizacionGrupos] = useState<
    number | null
  >(null);
  const [selectedConfiguration, setSelectedConfiguration] = useState<
    number | null
  >(null);
  const [visibleitemIndex, setVisibleIndexItems] = useState<number | null>(
    null
  );

  const handleClickSelectedConfiguration = (index: number) => {
    setSelectedConfiguration(index);
  };

  const handleClickSelectedPlanning = (index: number) => {
    setSelectedOrganizacionGrupos(index);
  };
  const handleClickConfiguration = (index: number) => {
    setVisibleIndexItems(index === visibleitemIndex ? null : index);
  };

  const menuMaterialDidactico = [
    {
      name: "Actividades",
      href: "/materialDidactico",
      icon: "/grados.svg",
    },
  ];

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
    { name: "Alumnos", href: "/configuration/alumnos", icon: "/grados.svg" },
    { name: "Fechas", href: "/configuration/fechas", icon: "/grados.svg" },
    {
      name: "Encuadre calificación",
      href: "/configuration/encuadre_calificacion",
      icon: "/grados.svg",
    },
  ];

  return (
    <div
      className="fixed top-12 left-0 h-full w-64  text-gray-100 dark:text-white
        dark:bg-[#1a2c32]  bg-[#356169]"
    >
      <ul className="mt-4">
        <Link className="" key="contenido" href="/contenido">
          <li
            className="flex space-x-2 px-4 py-2 text-sm "
            onClick={() => handleClickConfiguration(0)}
          >
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
        <Link className="" key="mat-didactico" href="/material_didactico">
          <li
            className="flex space-x-2  px-4 py-2 text-sm "
            onClick={() => handleClickConfiguration(0)}
          >
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
        <li
          className="block px-4 py-2 text-sm "
          onClick={() => handleClickConfiguration(0)}
        >
          <div className="flex space-x-2">
            <Image
              className="dark:filter dark:invert dark:opacity-75 opacity-70 filter invert  mr-3"
              src="/iconos/sidebar/grupos.svg"
              width={24}
              height={24}
              alt=""
            />
            <span className="opacity-80"> Organización de mis grupos</span>
          </div>

          {visibleitemIndex === 0 && (
            <ul>
              {menuOrganizacionGrupos.map((item, index) => (
                <li
                  key={index}
                  className={` block  mr-4 rounded-lg ${
                    selectedOrganizacionGrupos === index
                      ? "bg-gray-600"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={(e) => {
                    handleClickSelectedPlanning(index);
                    e.stopPropagation();
                  }}
                >
                  <Link
                    className="flex items-center space-x-4 pl-4 pt-3 pb-3 pr-3 "
                    key={index}
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
                </li>
              ))}
            </ul>
          )}
        </li>
        <li
          className=" pl-4 pt-3 text-sm "
          onClick={() => {
            handleClickConfiguration(1);
          }}
        >
          <div className="flex space-x-2">
            <Image
              className="dark:filter dark:invert dark:opacity-75 opacity-70 filter invert  mr-3"
              src="/iconos/sidebar/configuration.svg"
              width={24}
              height={24}
              alt=""
            />
            <span className="opacity-80"> Configuración</span>
          </div>

          {visibleitemIndex === 1 && (
            <ul>
              {menuItemsConfiguration.map((item, index) => (
                <ol
                  key={index}
                  className={` block mr-4  rounded-lg ${
                    selectedConfiguration === index
                      ? "bg-gray-600"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={(e) => {
                    handleClickSelectedConfiguration(index);
                    e.stopPropagation();
                  }}
                >
                  <Link
                    className="flex items-center space-x-4 pl-4 pt-3 pb-3 pr-3"
                    key={index}
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
                </ol>
              ))}
            </ul>
          )}
        </li>

        <li
          className=" pl-4 pt-3 text-sm"
          onClick={() => {
            handleClickConfiguration(1);
          }}
        >
          <div className="flex space-x-2">
            <Image
              className="dark:filter dark:invert dark:opacity-75 opacity-70 filter invert  mr-3"
              src="/iconos/sidebar/productos.svg"
              width={24}
              height={24}
              alt=""
            />
            <span className="opacity-80"> Productos de evaluación formativa</span>
          </div>
        </li>
        <Link className="" key="cronogramas" href="/cronogramas">
          <li
            className=" pl-4 pt-3 text-sm "
            onClick={() => {
              //  handleClickConfiguration(1);
            }}
          >
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
          href="/organizacion_material_didactico"
        >
          <li
            className="block px-4 py-2 text-sm"
            onClick={() => handleClickConfiguration(0)}
          >
            <div className="flex space-x-2">
              <Image
                className="dark:filter dark:invert dark:opacity-75 opacity-70 filter invert  mr-3"
                src="/iconos/sidebar/organizacion.svg"
                width={24}
                height={24}
                alt=""
              />
              <span className="opacity-80">Organización material didáctico</span>
            </div>
            
          </li>
        </Link>
      </ul>
    </div>
  );
}
