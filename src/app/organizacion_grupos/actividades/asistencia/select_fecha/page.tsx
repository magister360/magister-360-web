
"use client"
import Link from "next/link";

export default function SeleccionFecha() {

    return (

        <>
            <label className="ml-72 md:mt-14 block text-gray-700 dark:text-gray-200 font-bold text-xl mb-2"
                htmlFor="lbl-date-start-end">
                Asistencias
            </label>


            <div className="ml-72 md:mt-2 pt-2 pb-4 pl-4 pr-4  rounded-lg shadow  
                 sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]">

                <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
                    htmlFor="lbl-date-start-end">
                    Fecha
                </label>
                <input
                    type="date"
                    id="date-start"
                    className="bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                                 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-blue-500 
                                  dark:focus:border-blue-500"
                    placeholder=""

                />
                <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2 mt-2"
                    htmlFor="lbl-orden-alumnos">
                    Orden mostrar alumnos
                </label>
                <div>
                    <div className="flex items-center mb-1">
                        <input disabled id="disabled-radio-1" type="radio" value=""
                            name="disabled-radio" className="w-4 h-4 text-blue-600 bg-gray-100 
                         border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                         dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 
                         dark:border-gray-600"/>
                        <label htmlFor="disabled-radio-1" className="ms-2 text-sm
                             font-medium text-gray-400 dark:text-gray-500">Asendente</label>
                    </div>
                    <div className="flex items-center mb-1">
                        <input disabled checked id="disabled-radio-2" type="radio" value=""
                            name="disabled-radio" className="w-4 h-4 text-blue-600 bg-gray-100 
                        border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                        dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 
                        dark:border-gray-600"/>
                        <label htmlFor="disabled-radio-2" className="ms-2 text-sm font-medium 
                            text-gray-400 dark:text-gray-500">Desendente</label>
                    </div>
                    <div className="flex items-center">
                        <input disabled checked id="disabled-radio-3" type="radio" value=""
                            name="disabled-radio" className="w-4 h-4 text-blue-600 bg-gray-100 
                        border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                        dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 
                        dark:border-gray-600"/>
                        <label htmlFor="disabled-radio-3" className="ms-2 text-sm font-medium 
                            text-gray-400 dark:text-gray-500">Aleatorio</label>
                    </div>
                </div>

                <div className="mt-4 mb-4 w-full">
                    <Link href='/organizacion_grupos/actividades/asistencia'
                        className="w-full block  text-white bg-[#438e96] hover:bg-[#3b757f] 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5  text-center 
                          dark:bg-[#438e96] dark:hover:bg-[#3b757f] 
                           dark:focus:ring-blue-800  ">Continuar</Link>
                </div>
            </div>
        </>
    )
}