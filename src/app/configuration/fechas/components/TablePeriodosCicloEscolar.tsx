
import Image from 'next/image';
export default function TablePeriodosCicloEscolar() {

    return (
        <div className="rounded-lg shadow  
        sm:max-w-full  dark:bg-[#18181B] bg-[#ffffff]  pt-2 pb-4 pr-0  ">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg  mt-3 ">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500
                                        dark:text-gray-400">
                    <thead className="border-b text-xs  uppercase  
                                        dark:bg-[#2d464c] bg-gray-50  dark:text-gray-300
                                         text-black">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No. periodo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fecha inicial
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fecha final
                            </th>
                            <th scope="col" className="px-6 py-3 min-w-[10px]">
                                Editar
                            </th>
                            <th scope="col" className="px-6 py-3 min-w-[10px]">
                                Remover
                            </th>
                        </tr>
                    </thead>

                    <tbody>


                        <tr key={0} className="border-b dark:bg-[#1a2c32] bg-[#ffffff]
                            dark:border-gray-700 hover:bg-[#e6e6e6]
                             dark:hover:bg-gray-600">

                            <td className="px-6 py-3">
                                <div className="flex items-center">
                                    1
                                </div>



                            </td>
                            <td className="px-6 py-3">
                                <div className="flex items-center">
                                    10/12/2024
                                </div>
                            </td>
                            <td className="px-6 py-3">
                                <div className="flex items-center">
                                    1/1/2024
                                </div>
                            </td>
                            <td className="px-6 py-4 min-w-[10px] ">
                                <Image
                                    className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none mr-3t"
                                    src="/editar.svg"
                                    alt="editar"
                                    width={28}
                                    height={28}

                                />

                            </td>
                            <td className="px-6 py-4 min-w-[10px] ">
                                <Image
                                    className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none mr-3t"
                                    src="/remover.svg"
                                    alt="remover"
                                    width={28}
                                    height={28}

                                />

                            </td>
                        </tr>



                    </tbody>
                </table>
            </div>
            <label className="block text-gray-700 dark:text-gray-200 font-bold mb-0 mt-4"
                htmlFor="lbl-date-start-end">
                Nuevo periodo
            </label>
            <div className=' flex space-x-2   mb-2 mt-0'>
                <div className='w-full flex items-center space-x-3'>
                    <Image
                        className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none w-auto h-7"
                        src="/add.svg"
                        alt="add"
                        width={28}
                        height={28}
                    />
                    <div className='flex-1 flex space-x-3'>
                        <div className='w-1/3'>
                            <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2 mt-4"
                                htmlFor="lbl-date-start-end">
                                Fecha inicial
                            </label>
                            <input
                                type="date"
                                id="date-start"
                                className="w-full bg-gray-50 border border-gray-300 
                                    text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                      focus:border-primary-600 block  p-2.5 dark:bg-[#1a2c32]
                                    dark:border-gray-600 dark:placeholder-gray-400
                                    dark:text-white dark:focus:ring-blue-500 
                                   dark:focus:border-blue-500"
                                placeholder=""
                            />
                        </div>
                        <div className='w-1/3'>
                            <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2 mt-4"
                                htmlFor="lbl-date-end">
                                Fecha final
                            </label>
                            <input
                                type="date"
                                id="date-end"
                                className="w-full bg-gray-50 border border-gray-300 
                                    text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                      focus:border-primary-600 block p-2.5 dark:bg-[#1a2c32]
                                    dark:border-gray-600 dark:placeholder-gray-400
                                    dark:text-white dark:focus:ring-blue-500 
                                    dark:focus:border-blue-500"
                                placeholder=""
                            />
                        </div>
                    </div>
                </div>

            </div>
            <div className='sm:max-w-sm'>
                <button type="submit"
                    className="w-full mt-2 text-white bg-[#438e96] hover:bg-[#3b757f] 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                          dark:bg-[#438e96] dark:hover:bg-[#3b757f] 
                           dark:focus:ring-blue-800  ">Guardar</button>
            </div>
        </div>
    )
}

