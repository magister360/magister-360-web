"use client"

import Link from "next/link";
import { useState } from "react";
import Image from 'next/image'

export default function SidebarLeft() {
    const [selectedPlanning, setSelectedPlanning] = useState<number | null>(null);
    const [selectedConfiguration, setSelectedConfiguration] = useState<number | null>(null);
    const [visibleitemIndex, setVisibleIndexItems] = useState<number | null>(null);

    const handleClickSelectedConfiguration = (index: number) => {
        setSelectedConfiguration(index);
    };

    const handleClickSelectedPlanning = (index: number) => {
        setSelectedPlanning(index);
    };
    const handleClickConfiguration = (index: number) => {
        setVisibleIndexItems(index === visibleitemIndex ? null : index);
    };

    const menuItemsConfiguration = [
        { name: 'Grado', href: '/configuration/grado', icon: '/grados.svg' },
        { name: 'Grupo', href: '/configuration/grupo', icon: '/grupos.svg' },
        { name: 'Materia', href: '/configuration/materia', icon: '/materias.svg' },
        { name: 'Alumnos', href: '/configuration/alumnos', icon: '/grados.svg' },
        { name: 'Fechas festivas', href: '/configuration/fechas_festivas', icon: '/grados.svg' }

    ];
    const menuItemPlanning = [
        { name: 'Actividades', href: 'actividades', icon: '/grados.svg' }
    ];

    return (
        <div className="fixed top-12 left-0 h-full w-64  text-white 
        dark:bg-gray-800 dark:border-gray-700 bg-white">
         
            <ul className="mt-4">
                <li className="block px-4 py-2 text-sm text-black dark:text-white"
                    onClick={() => handleClickConfiguration(0)}>
                    Planeación
                    {visibleitemIndex === 0 && (
                        <ul>
                            {
                                menuItemPlanning.map((item, index) => (
                                    <li
                                        key={index}
                                        className={` block  mr-4 rounded-lg ${selectedPlanning === index ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
                                        onClick={(e) => {
                                            handleClickSelectedPlanning(index);
                                            e.stopPropagation();
                                        }
                                        }>
                                        <Link
                                            className="flex items-center space-x-4 pl-4 pt-3 pb-3 pr-3 text-black dark:text-white"
                                            key={index}
                                            href={item.href}>
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

                                ))
                            }
                        </ul>
                    )}
                </li>
                <li
                    className=" pl-4 pt-3 text-sm text-black dark:text-white"
                    onClick={() => {
                        handleClickConfiguration(1);
                    }}>
                    Configuración

                    {visibleitemIndex === 1 && (
                        <ul>
                            {menuItemsConfiguration.map((item, index) => (

                                <ol
                                    key={index}
                                    className={` block mr-4  rounded-lg ${selectedConfiguration === index ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
                                    onClick={(e) => {
                                        handleClickSelectedConfiguration(index);
                                        e.stopPropagation();

                                    }}>

                                    <Link
                                        className="flex items-center space-x-4 pl-4 pt-3 pb-3 pr-3 text-black dark:text-white"
                                        key={index}
                                        href={item.href}
                                    >
                                        <Image
                                            className="filter invert mr-3"
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
                    className=" pl-4 pt-3 text-sm text-black dark:text-white"
                    onClick={() => {
                        handleClickConfiguration(1);
                    }}>
                    Estadisticas
                </li>
                <li
                    className=" pl-4 pt-3 text-sm text-black dark:text-white"
                    onClick={() => {
                        handleClickConfiguration(1);
                    }}>
                    Entregables
                </li>
                <li
                    className=" pl-4 pt-3 text-sm text-black dark:text-white"
                    onClick={() => {
                        handleClickConfiguration(1);
                    }}>
                    Cronogramas
                </li>
            </ul>
        </div>

    );
}