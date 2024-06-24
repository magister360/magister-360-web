import Link from "next/link";

export default function ParticipacionSelectFecha() {

    return (
        <>
            <label className="ml-72 md:mt-14 block text-gray-700 dark:text-gray-200 font-bold text-xl mb-2"
                htmlFor="lbl-date-start-end">
                Participación
            </label>

            <div className="ml-72 md:mt-2 pt-2 pb-4 pl-4 pr-4  rounded-lg shadow  
                 sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]">
                <div>
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
                    <div className="mt-4 mb-4 w-full">
                        <Link href='/planeacion/actividades/participacion'
                            className="w-full block  text-white bg-[#438e96] hover:bg-[#3b757f] 
                            focus:ring-4 focus:outline-none focus:ring-blue-300 
                            font-medium rounded-lg text-sm px-5 py-2.5  text-center 
                          dark:bg-[#438e96] dark:hover:bg-[#3b757f] 
                           dark:focus:ring-blue-800  ">Continuar</Link>
                    </div>
                </div>
            </div>
        </>

    )
}