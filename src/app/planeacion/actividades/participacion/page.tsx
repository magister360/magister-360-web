
import Image from 'next/image';
import TableAlumnosParticipacion from './components/TableAlumnosParticipacion';
export default function Participacion() {

    return (
        <>
            <label className="ml-72 md:mt-14 block text-gray-700 dark:text-gray-200 
                font-bold text-xl mb-2"
                htmlFor="lbl-date-start-end">
                Participación
            </label>

            <div className="ml-72 mt-2 pt-4 pb-4 pl-4 pr-4  rounded-lg shadow  
                 sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]">

                <div className="flex space-x-2">
                    <div className=" px-5 py-2.5 rounded-lg dark:bg-[#1a2c32] bg-[#93c8cd]">

                        <label className="block text-gray-700 dark:text-gray-200 font-bold text-md mb-2"
                            htmlFor="lbl-date-start-end">
                            Grado: <span className="font-normal text-sm"> 1</span>
                        </label>
                    </div>

                    <div className=" px-5 py-2.5 rounded-lg dark:bg-[#1a2c32] bg-[#93c8cd]">

                        <label className="block text-gray-700 dark:text-gray-200 font-bold 
                        text-md mb-2"
                            htmlFor="lbl-date-start-end">
                            Grupo: <span className="font-normal text-sm"> A</span>
                        </label>
                    </div>

                    <div className=" px-5 py-2.5 rounded-lg dark:bg-[#1a2c32] bg-[#93c8cd]">

                        <label className="block text-gray-700 dark:text-gray-200 font-bold text-md mb-2"
                            htmlFor="lbl-date-start-end">
                            Materia: <span className="font-normal text-sm"> Matematicas</span>
                        </label>
                    </div>

                </div>
                <label className=" md:mt-2 block text-gray-700 dark:text-gray-200 
                    font-bold text-sm mb-2"
                    htmlFor="lbl-date-start-end">
                    Fecha <span className="font-normal text-sm"> 17 de junio del 2024</span>
                </label>
            </div>

            <div className="ml-72 mt-2 pt-4 pb-4 pl-4 pr-4  rounded-lg shadow  
                 sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]">
                <label className="block text-gray-700 dark:text-gray-200 font-bold text-md mb-2"
                    htmlFor="lbl-f">
                    Titulo
                    <h2 className="font-light text-base">
                        Adición, sustracción y comparación de números de dos cifras
                    </h2>
                </label>
            </div>

            <div className="ml-72 mt-2 pt-4 pb-4 pl-4 pr-4  rounded-lg shadow  
                 sm:max-w-full  dark:bg-[#18181B] bg-[#ffffff] mr-4">
                <label className="block text-gray-700 dark:text-gray-200 font-bold text-md mb-2"
                    htmlFor="lbl-f">
                    Codigo de barras

                </label>


                <div className="relative w-full sm:max-w-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Image
                            className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none w-auto h-7"
                            src="/barcode.svg"
                            alt="barcode"
                            width={28}
                            height={28}
                        />
                    </div>
                    <input
                        type="text"
                        id="text-grado"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
                         rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full 
                         pl-14 p-2.5 dark:bg-[#1a2c32] dark:border-gray-600
                          dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                           dark:focus:border-blue-500"
                        placeholder=""
                    />
                </div>

                <TableAlumnosParticipacion data={[]} errorEncabezado=''/>


            </div>
        </>
    )
}