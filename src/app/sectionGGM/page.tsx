'use client'
import { useEffect, useState } from "react";

import { useRouter } from 'next/navigation';
import { loadSessionFromLocalStorage } from "../sesions/SesionCookies";
import { getGrupos } from "../configuration/grupo/controller/GrupoController";
import { TypeStatusGrupo } from "../utils/TypeStatusGrupo";
import { getGrados } from "../configuration/grado/controller/GradoController";
import { TypeStatusGrado } from "../utils/TypeStatusGrado";
import { getMaterias } from "../configuration/materia/controller/MateriaController";
import { TypeStatusMateria } from "../utils/TypeStatusMateria";
import OptionsGrados, { filterIndexGrado } from "./components/OptionGrados";
import OptionsGrupos, { filterIndexGrupo } from "./components/OptionsGrupos";
import OptionsMaterias, { filterIndexMaterias } from "./components/OptionsMaterias";
import { saveSelectionGGMCookies } from "../selection/SelectionGGMCookies";


export default function SectionGGM() {
    const router = useRouter();
    const [itemsGrados, setItemsGrados] = useState([]);
    const [itemsGrupos, setItemsGrupos] = useState([]);
    const [itemsMaterias, setItemsMaterias] = useState([]);
    const [selectGrado, setSelectGrado] = useState({
        idGrado: -1,
        grado: ''
    });
    const [selectGrupo, setSelectGrupo] = useState({
        idGrupo: -1,
        grupo: ''
    });
    const [selectMateria, setSelectMateria] = useState({
        idMateria: -1,
        materia: ''
    });


    const onSubmitForm = () => {
        const gradosEmpty = isArrayEmpty(itemsGrados);
        const gruposEmpty = isArrayEmpty(itemsGrupos);
        const materiasEmpty = isArrayEmpty(itemsMaterias);
        if (!gradosEmpty && !gruposEmpty && !materiasEmpty) {
            saveSelectionGGMCookies(
                selectGrado.idGrado,
                selectGrado.grado,
                selectGrupo.idGrupo,
                selectGrupo.grupo,
                selectMateria.idMateria,
                selectMateria.materia
            )
        }
        router.push('/')
    };

    const handleChangeGrado = (event: { target: { selectedIndex: any; }; }) => {
        const selectedIndex = event.target.selectedIndex;
        if (!isArrayEmpty(itemsGrados)) {
            const itemFilter = filterIndexGrado({ itemsGrados }, selectedIndex);
            if (itemFilter) {
                setSelectGrado({
                    idGrado: itemFilter.id,
                    grado: itemFilter.grado

                })
            };
        }
    }

    const handleChangeGrupo = (event: { target: { selectedIndex: any; }; }) => {
        const selectedIndex = event.target.selectedIndex;
        if (!isArrayEmpty(itemsGrupos)) {
            const itemFilter = filterIndexGrupo({ itemsGrupos }, selectedIndex);
            if (itemFilter) {
                setSelectGrado({
                    idGrado: itemFilter.id,
                    grado: itemFilter.grupo

                })
            };
        }
    }

    const handleChangeMateria = (event: { target: { selectedIndex: any; }; }) => {
        const selectedIndex = event.target.selectedIndex;
        if (!isArrayEmpty(itemsGrupos)) {
            const itemFilter = filterIndexMaterias({ itemsMaterias }, selectedIndex);
            if (itemFilter) {
                setSelectMateria({
                    idMateria: itemFilter.id,
                    materia: itemFilter.materia

                })
            };
        }
    }
    const isArrayEmpty = (array: any[]) => {
        return array.length === 0;
    };


    useEffect(() => {
        const sesionLocalStorage = loadSessionFromLocalStorage();
        if (!sesionLocalStorage) {
            router.push('/login');
            return;
        }
        const userId = sesionLocalStorage?.id ?? -1;


        const fetchGrados = async () => {
            const grados = await getGrados(
                userId,
                TypeStatusGrado.ALTA
            );
            return grados || [];
        };

        const fetchGrupos = async () => {
            const grupos = await getGrupos(
                userId,
                TypeStatusGrupo.ALTA
            );
            return grupos || [];
        };

        const fetchMaterias = async () => {
            const materias = await getMaterias(
                userId,
                TypeStatusMateria.ALTA
            );
            return materias || [];
        };

        Promise.all([
            fetchGrados(),
            fetchGrupos(),
            fetchMaterias()])
            .then(([grados, grupos, materias]) => {
                setItemsGrados(grados);
                setItemsGrupos(grupos);
                setItemsMaterias(materias);

            })
            .catch((error) => {
                //console.error(error);
            });

    }, []);

    useEffect(() => {
        const selectElement = document.getElementById('select-grado') as HTMLSelectElement | null;;
        if (selectElement) {
            handleChangeGrado({
                target: selectElement,
            });
        }
    }, [itemsGrados]);

    useEffect(() => {
        const selectElement = document.getElementById('select-grupo') as HTMLSelectElement | null;;
        if (selectElement) {
            handleChangeGrupo({
                target: selectElement,
            });
        }
    }, [itemsGrupos]);


    useEffect(() => {
        const selectElement = document.getElementById('select-materia') as HTMLSelectElement | null;;
        if (selectElement) {
            handleChangeMateria({
                target: selectElement,
            });
        }
    }, [itemsMaterias]);

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto 
            md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 
                        sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
                <form className="max-w-sm mx-auto mt-10 mb-10"
                    onSubmit={onSubmitForm}
                >
                    <div>
                        <label htmlFor="small" className="block mb-2 text-sm font-medium text-gray-900
                        dark:text-white">Seleccione grado</label>
                        <select id="select-grado" className="block w-full p-2 mb-6 text-sm text-gray-900 
                         border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
                        focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                        dark:focus:border-blue-500 "

                            onChange={handleChangeGrado}>
                            <OptionsGrados itemsGrados={itemsGrados} />
                        </select>
                    </div>


                    <div>
                        <label htmlFor="small" className="block mb-2 text-sm font-medium text-gray-900
             dark:text-white">Seleccione grupo</label>
                        <select id="select-grupo" className="block w-full p-2 mb-6 text-sm text-gray-900 
                    border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
                  focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500 "

                            onChange={handleChangeGrupo}>
                            <OptionsGrupos itemsGrupos={itemsGrupos} />
                        </select>
                    </div>

                    <div>
                        <label htmlFor="small" className="block mb-2 text-sm font-medium text-gray-900
             dark:text-white">Seleccione materia</label>
                        <select id="select-materia" className="block w-full p-2 mb-6 text-sm text-gray-900 
                    border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
                  focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500 "

                            onChange={handleChangeMateria}>
                            <OptionsMaterias itemsMaterias={itemsMaterias} />
                        </select>
                    </div>

                    <button type="submit"
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                          dark:bg-blue-600 dark:hover:bg-blue-700 
                           dark:focus:ring-blue-800  ">Continuar</button>
                </form>
            </div >
        </div >

    );
}