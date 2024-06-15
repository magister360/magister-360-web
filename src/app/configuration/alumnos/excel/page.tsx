"use client"

import { useRouter } from 'next/navigation';
import TableAlumnosExcel from './components/TableAlumnosExcel';
import { useEffect, useState } from "react";
import OptionsGrados, { filterIndexGrado } from '@/app/sectionGGM/components/OptionGrados';
import OptionsGrupos, { filterIndexGrupo } from '@/app/sectionGGM/components/OptionsGrupos';
import { getGrados } from '../../grado/controller/GradoController';
import { loadSessionFromLocalStorage } from '@/app/sesions/SesionCookies';
import { getGrupos } from '../../grupo/controller/GrupoController';
import { TypeStatusGrupo } from '@/app/utils/TypeStatusGrupo';
import { TypeStatusGrado } from '@/app/utils/TypeStatusGrado';
import Image from 'next/image'

export default function AlumnosExcel() {

    const [itemsGrados, setItemsGrados] = useState([]);
    const [itemsGrupos, setItemsGrupos] = useState([]);
    const [selectGrado, setSelectGrado] = useState({
        idGrado: -1,
        grado: ''
    });
    const [selectGrupo, setSelectGrupo] = useState({
        idGrupo: -1,
        grupo: ''
    });

    const isArrayEmpty = (array: any[]) => {
        return array.length === 0;
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



        Promise.all([
            fetchGrados(),
            fetchGrupos()])
            .then(([grados, grupos]) => {
                setItemsGrados(grados);
                setItemsGrupos(grupos);

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

    const itempNames = [
        { id: 1, noLista: '1', name: 'pedro', apellidoPaterno: 'Martinez', apellidoMaterno: 'Martinez', icon: '/grados.svg', estatus: 0, codigoBarras: '1234567890123' },
        { id: 2, noLista: '2', name: 'Maria', apellidoPaterno: 'Perez', apellidoMaterno: 'Martinez', icon: '/grados.svg', estatus: 1, codigoBarras: '1234567890123' },
        { id: 3, noLista: '2', name: 'Maria', apellidoPaterno: 'Perez', apellidoMaterno: 'Martinez', icon: '/grados.svg', estatus: 2, codigoBarras: '1234567890123' }

    ];

    const router = useRouter();

    const handleSubmitRouterPdf = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push('alumnos/pdf_codigo_barras')
    }
    return (
        <div className="mt-14 ml-72">
            <div className="rounded-lg shadow  
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  pl-4 pt-4 pb-4 pr-4">

                <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
                    htmlFor="lbl-select-grado-grupo">
                    Seleccione grado y grupo
                </label>
                <div>
                    <label htmlFor="small" className="block mb-2 text-sm font-medium
                     text-gray-900 dark:text-white">Grado</label>
                    <select id="select-grado" className="block w-full p-2 mb-2 text-sm 
                    text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1a2c32]
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                        onChange={handleChangeGrado} >
                        <OptionsGrados itemsGrados={itemsGrados} />
                    </select>
                </div>

                <div>
                    <label htmlFor="lbl-grupo" className="block mb-2 text-sm font-medium 
                    text-gray-900 dark:text-white">Grupo</label>
                    <select id="select-grupo" className="block w-full p-2 mb-6 text-sm 
                    text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1a2c32]
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                        onChange={handleChangeGrupo}>
                        <OptionsGrupos itemsGrupos={itemsGrupos} />
                    </select>
                </div>

            </div>
            <div className="rounded-lg shadow  
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  pl-4 pt-4 pb-4 pr-4 mt-4">
                <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
                    htmlFor="fileInput">
                    Subir archivo
                </label>
                <input
                    className="appearance-none block w-full dark:bg-[#18181B] bg-[#ffffff]
                     dark:text-gray-200 py-3 px-4 mb-3  focus:outline-none 
                    focus:bg-white "
                    id="fileInput"
                    type="file"

                />

            </div>
            <div className="rounded-lg shadow  
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  pl-4 pt-4 pb-4 pr-4 mt-4">
                <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
                    htmlFor="lbl-select-grado-grupo">
                    Seleccione la hoja del archivo excel
                </label>
                <select id="select-hoja" className="block w-full p-2 mb-2 text-sm 
                    text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1a2c32]
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                >

                </select>

                <button type="submit"
                    className="w-full text-white bg-[#438e96] hover:bg-[#3b757f] 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                          dark:bg-[#438e96] dark:hover:bg-[#3b757f] 
                           dark:focus:ring-blue-800 mt-3  ">Cargar</button>
            </div>
            <div className="rounded-lg shadow  
                        sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  pl-4 pt-4 pb-4 pr-4 mt-4
                       space-y-2 ">
                <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
                    htmlFor="lbl-select-grado-grupo">
                    Columnas detectadas
                </label>
                <div className='flex space-x-2'>
                    <Image
                        className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none"
                        src="/ok.svg"
                        width={24}
                        height={24}
                        alt=""
                    />
                    <p>
                        No. lista
                    </p>
                </div>
                <div className='flex space-x-2'>
                    <Image
                        className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none"
                        src="/ok.svg"
                        width={24}
                        height={24}
                        alt=""
                    />
                    <p>
                        Nombre
                    </p>
                </div>
                <div className='flex space-x-2'>
                    <Image
                        className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none"
                        src="/ok.svg"
                        width={24}
                        height={24}
                        alt=""
                    />
                    <p>
                        Apellido paterno
                    </p>
                </div>
                <div className='flex space-x-2'>
                    <Image
                        className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none"
                        src="/ok.svg"
                        width={24}
                        height={24}
                        alt=""
                    />
                    <p>
                        Appellido materno
                    </p>
                </div>
            </div>

            <TableAlumnosExcel itempNames={itempNames} />
            <div className="w-full  bg-white rounded-lg shadow dark:border md:mt-0 
                sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
                <form className="max-w-sm mx-auto mt-10 mb-10"
                    onSubmit={handleSubmitRouterPdf}>
                    Visualizar código de barras
                    <button type="submit"
                        className="w-full mt-4 text-white bg-blue-600 hover:bg-blue-700 
                focus:ring-4 focus:outline-none focus:ring-blue-300 
                 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                  dark:bg-blue-600 dark:hover:bg-blue-700 
                   dark:focus:ring-blue-800  ">Visualizar pdf</button>
                </form>
            </div>
        </div>
    )
}