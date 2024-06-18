'use client'

import TableFechasFestivas from "./components/TableFechasFestivas";
import Image from 'next/image';

export default function Fechas() {

    function redirectToCalendar() {
        const url = "https://calendarioescolar.sep.gob.mx";
        const win = window.open(url, "_blank");
        if (win !== null) {
            win.focus();
        }
    }
    return (
        <>
            <div className=" flex  sm:max-w-full ">

                <div className="flex-1 mt-14 ml-72 rounded-lg shadow  
                    sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  p-5">
                    <label className="block text-gray-700 dark:text-gray-200 font-bold text-xl mb-2"
                        htmlFor="lbl-date-start-end">
                        Fechas de inicio y fin de clases
                    </label>

                    <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
                        htmlFor="lbl-date-start-end">
                        Fecha inicio clases
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

                    <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
                        htmlFor="lbl-date-start-end">
                        Fecha fin clases
                    </label>

                    <input
                        type="date"
                        id="date-end"
                        className="bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                                 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-blue-500 
                                  dark:focus:border-blue-500"
                        placeholder=""

                    />
                </div>

                <div className="flex flex-col  flex-1 mt-14 ml-2  rounded-lg shadow  
                    sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  p-5">
                    <label className="block text-gray-700 dark:text-gray-200 font-bold
                    text-xl pt-2"
                        htmlFor="lbl-date-start-end">
                        Calendario escolar
                    </label>
                    <p>
                        Educación prescolar, primaria y secundaria
                    </p>

                    <button type="button"
                        onClick={redirectToCalendar}
                        className="w-full mt-2 text-white bg-[#438e96] hover:bg-[#3b757f] 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5  text-center 
                          dark:bg-[#438e96] dark:hover:bg-[#3b757f] 
                           dark:focus:ring-blue-800  ">Ir a calendario escolar</button>

                </div>

            </div>

            <div className="mt-2 ml-72 rounded-lg shadow  
                            sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]  p-5 mb-4">

                <label className="block text-gray-700 dark:text-gray-200 font-bold text-xl pt-0"
                    htmlFor="lbl-date-start-end">
                    Fechas festivas
                </label>
                <TableFechasFestivas />

                <div className='mt-2 mb-0'>
                    <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
                        htmlFor="lbl-date-start-end">
                        Nueva fecha
                    </label>
                    <div className='flex space-x-2  items-center justify-center mb-2'>
                        <Image

                            className="dark:filter dark:invert dark:opacity-75 opacity-40 
                                filter-none w-auto h-7"
                            src="/add.svg"
                            alt="add"
                            width={28}
                            height={28}

                        />

                        <input
                            type="date"
                            id="date-end"
                            className="bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                                 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-blue-500 
                                  dark:focus:border-blue-500"
                            placeholder=""

                        />


                    </div>
                    <div className="pl-8">
                        <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
                            htmlFor="lbl-date-start-end">
                            Actividad
                        </label>
                        <select id="select-materia" className="block w-full p-2 mb-6 text-sm text-gray-900 
                                    border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
                                  focus:border-blue-500 dark:bg-[#1a2c32] dark:border-gray-600
                                  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                 dark:focus:border-blue-500 "

                        >


                        </select>
                    </div>
                    <button type="submit"
                        className="w-full text-white bg-[#438e96] hover:bg-[#3b757f] 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                          dark:bg-[#438e96] dark:hover:bg-[#3b757f] 
                           dark:focus:ring-blue-800  ">Guardar</button>
                </div>
            </div >
        </>
    )

}