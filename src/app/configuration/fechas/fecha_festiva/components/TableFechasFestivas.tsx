
import Image from 'next/image';
export default function TableFechasFestivas() {

    return (
       
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg  mt-3 ">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500
                                        dark:text-gray-400">
                    <thead className="border-b text-xs  uppercase  
                                        dark:bg-[#2d464c] bg-gray-50  dark:text-gray-300 text-black">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Fechas festivas
                            </th>
                            <th scope="col" className="px-6 py-3 ">
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
                                    10/02/2024
                                </div>

                            </td>

                            <td className="px-6 py-4 min-w-[20px]">
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

    )
}

