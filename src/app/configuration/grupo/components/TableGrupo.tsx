"use client"
import React from 'react';
import Image from 'next/image';

type Item = {
    id: number;
    grupo: string;

}

type Props = {
    itempNames: Item[];
}

export default function TableGrupos({ itempNames }: Props) {

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>

                        <th scope="col" className="px-6 py-3 min-w-[150px]">
                            Grupo
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Editar
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Remover
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {itempNames.map((item, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                            <td className="w-4 p-4 min-w-[150px]">
                                <div className="flex items-center">
                                    {item.grupo}
                                </div>
                            </td>


                            <td className="px-6 py-4">

                                <Image
                                    className="filter invert"
                                    src="/editar.svg"
                                    alt="editar"
                                    width={28}
                                    height={28}
                                    priority
                                />

                            </td>
                            <td className="px-6 py-4">

                                <Image
                                    className=" filter invert"
                                    src="/remover.svg"
                                    alt="remover"
                                    width={28}
                                    height={28}
                                    priority
                                />
                            </td>

                        </tr>
                    ))}


                </tbody>
            </table>
        </div>

    );

}