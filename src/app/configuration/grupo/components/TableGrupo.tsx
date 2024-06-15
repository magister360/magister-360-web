"use client"
import React from 'react';
import Image from 'next/image';

export type ItemGrupo = {
    id: number;
    grupo: string;

}

type Props = {
    items: ItemGrupo[];
    handleClickRemove: (items: ItemGrupo[], index: number) => Promise<void>;
    handleClickUpdate: (items: ItemGrupo[], index: number) => Promise<void>;
}

export function getIdGrupo(items: ItemGrupo[], index: number) {
    return items[index].id
}
export function getStrGrupo(items: ItemGrupo[], index: number) {
    return items[index].grupo
}


export default function TableGrupos({ items, handleClickRemove, handleClickUpdate }: Props) {

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 
            dark:text-gray-400">
                <thead className="border-b text-xs  uppercase  
                dark:bg-[#2d464c] bg-gray-50  dark:text-gray-300 text-black">
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

                    {items.map((item, index) => (
                        <tr key={index} className="border-b dark:bg-[#1a2c32] bg-[#ffffff]
                         dark:border-gray-700 hover:bg-[#e6e6e6] dark:hover:bg-gray-600">

                            <td className="w-4 p-4 min-w-[150px]">
                                <div className="flex items-center">
                                    {item.grupo}
                                </div>
                            </td>


                            <td className="px-6 py-4">

                                <Image
                                    onClick={() => handleClickUpdate(items = items, index = index)}
                                    className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none"
                                    src="/editar.svg"
                                    alt="editar"
                                    width={28}
                                    height={28}
                                    priority
                                />

                            </td>
                            <td className="px-6 py-4">

                                <Image
                                    onClick={() => handleClickRemove(items = items, index = index)}
                                    className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none"
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