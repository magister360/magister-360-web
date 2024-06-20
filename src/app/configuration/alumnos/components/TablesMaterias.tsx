import { ItemMateria } from '@/app/types/types';
import Image from 'next/image';


type Props = {
    materiasSinAsignar: ItemMateria[];
    materiasAsignadas: ItemMateria[];
    errorEncabezado: string;
    removeMateriaSinAsignar: (id: number, index: number) => void;
    removeMateriaAsignar: (id: number, index: number) => void;
}

export default function TablesMaterias({
    materiasSinAsignar,
    materiasAsignadas,
    errorEncabezado,
    removeMateriaSinAsignar,
    removeMateriaAsignar }: Props) {

    return (
        <>
            {errorEncabezado === ''
                && (materiasSinAsignar.length !== 0 || materiasAsignadas.length !== 0)
                && (
                    <div className="rounded-lg shadow  
                    sm:max-w-full  dark:bg-[#18181B] bg-[#ffffff]  pl-4 pt-4 pb-4 pr-4 mt-4 mr-3">
                        <div className='grid grid-cols-2'>
                            <div className=''>

                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg  mt-3 mr-3">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500
                                        dark:text-gray-400">
                                        <thead className="border-b text-xs  uppercase  
                                        dark:bg-[#2d464c] bg-gray-50  dark:text-gray-300 text-black">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Materias sin asignar
                                                </th>
                                                <th scope="col" className="px-6 py-3 ">
                                                    Mover
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {materiasSinAsignar.map((item, index) => (
                                                <tr key={index} className="border-b dark:bg-[#1a2c32] bg-[#ffffff]
                                                                        dark:border-gray-700 hover:bg-[#e6e6e6]
                                                                         dark:hover:bg-gray-600">

                                                    <td className="px-6 py-3">
                                                        <div className="flex items-center">
                                                            {item.materia}
                                                        </div>

                                                    </td>

                                                    <td className="px-6 py-4 min-w-[20px]">
                                                        <Image
                                                            className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none mr-3t"
                                                            src="/arrow-right.svg"
                                                            alt="arrow-right"
                                                            width={28}
                                                            height={28}
                                                            onClick={() => removeMateriaSinAsignar(item.id, index)}
                                                        />

                                                    </td>
                                                </tr>
                                            ))}


                                        </tbody>

                                    </table>
                                </div>

                            </div>

                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg  mt-3 mr-3">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500
                                dark:text-gray-400">
                                    <thead className="border-b text-xs  uppercase  
                                                 dark:bg-[#2d464c] bg-gray-50  dark:text-gray-300 text-black">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Materias asignadas
                                            </th>
                                            <th scope="col" className="px-6 py-3 min-w-[20px] ">
                                                Eliminar
                                            </th>

                                        </tr>

                                    </thead>
                                    <tbody>

                                        {materiasAsignadas.map((item, index) => (
                                            <tr key={index} className="border-b dark:bg-[#1a2c32] bg-[#ffffff]
                                             dark:border-gray-700 hover:bg-[#e6e6e6] dark:hover:bg-gray-600">

                                                <td className="px-6 py-3">
                                                    <div className="flex items-center">
                                                        {item.materia}
                                                    </div>

                                                </td>
                                                <td className="px-6 py-4 min-w-[20px]">
                                                    <Image
                                                        className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none mr-3t"
                                                        src="/remover.svg"
                                                        alt="remover"
                                                        width={28}
                                                        height={28}
                                                        onClick={() => removeMateriaAsignar(item.id, index)}
                                                    />

                                                </td>
                                            </tr>

                                        ))}


                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                )}
        </>

    )
}