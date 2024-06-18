
import Image from 'next/image';

export default function Actividades() {

    return (
        <>
            <label className="ml-72 md:mt-14 block text-gray-700 dark:text-gray-200 
            font-bold text-xl mb-2"
                htmlFor="lbl-date-start-end">
                Asistencias
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

            <div className="ml-72 mt-2 mr-4 pt-4 pb-4 pl-4 pr-4  rounded-lg shadow  
                    sm:max-w-md  dark:bg-[#18181B] bg-[#ffffff]">
                <div className=' flex'>
                    <Image
                        className="rounded-lg aspect-square object-cover"
                        src="/profesor.jpg"
                        alt="Foto"
                        width={150}
                        height={150}
                        priority
                    />
                    <div className='pl-2'>
                        <div className="ps-3">
                            <label className=" md:mt-2 block text-gray-700 dark:text-gray-200 
                                font-bold text-sm mb-2"
                                htmlFor="lbl-date-start-end">
                                No. lista <span className="font-normal text-sm"> 10</span>
                            </label>
                            <div className="text-base font-semibold">Manuel</div>
                            <div className="font-normal text-gray-500">Lopez{' '}Recendez</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex ml-32 mt-4 space-x-3 '>
                        <div className='px-6 py-3 rounded-full dark:bg-[#1a2c32] bg-[#93c8cd]'>
                            <label className="  text-gray-700 dark:text-gray-200 
                                font-bold text-xl "
                                htmlFor="lbl-a">
                                A
                            </label>
                        </div>
                        <div className='px-6 py-3 rounded-full dark:bg-[#1a2c32] bg-[#93c8cd]'>
                            <label className="  text-gray-700 dark:text-gray-200 
                                font-bold text-xl "
                                htmlFor="lbl-r">
                                R
                            </label>
                        </div>
                        <div className='px-6 py-3 rounded-full dark:bg-[#1a2c32]  bg-[#93c8cd]'>
                            <label className="  text-gray-700 dark:text-gray-200 
                                font-bold text-xl "
                                htmlFor="lbl-f">
                                F
                            </label>
                        </div>
                    </div>
                    <div className='flex space-x-3 mt-2'>
                        <button type="button"

                            className="w-full mt-2 text-white bg-[#438e96] hover:bg-[#3b757f] 
                                    focus:ring-4 focus:outline-none focus:ring-blue-300 
                                    font-medium rounded-lg text-sm px-5 py-2.5  text-center 
                                  dark:bg-[#438e96] dark:hover:bg-[#3b757f] 
                                  dark:focus:ring-blue-800  ">Anterior</button>

                        <button type="button"

                            className="w-full mt-2 text-white bg-[#438e96] hover:bg-[#3b757f] 
                                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                                        font-medium rounded-lg text-sm px-5 py-2.5  text-center 
                                      dark:bg-[#438e96] dark:hover:bg-[#3b757f] 
                                      dark:focus:ring-blue-800  ">Siguiente</button>
                    </div>
                </div>

            </div>
        </>
    )

}