import EAN13Barcode from '@/app/components/EAN13BarcodeProps';
import React from 'react';

import { TypeIndexXlsAlumnos } from '../TypeIndexXlsAlumnos';
import { TableAlumnosTr } from './TableAlumnoBody';

type Props = {
    data: any[][];
    errorEncabezado: string;
}

export default function TableAlumnosExcel({ data, errorEncabezado }: Props) {

    return (
        <>
            {errorEncabezado === '' && data.length !== 0 && (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg  mt-3 mr-3">
                    <div className="flex items-center justify-between flex-column flex-wrap md:flex-row 
            space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">


                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500
             dark:text-gray-400">
                        <thead className="border-b text-xs  uppercase  
                dark:bg-[#2d464c] bg-gray-50  dark:text-gray-300 text-black">
                            <tr>

                                <th scope="col" className="px-6 py-3">
                                    No. lista
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nombres
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Código de barras
                                </th>
                                <th scope="col" className="px-6 py-3 min-w-[20px]">
                                    Status
                                </th>

                            </tr>
                        </thead>
                        <tbody>

                            {data.map((item, index) => (
                                item[TypeIndexXlsAlumnos.INDEX_NOMBRE] !== undefined ? (
                                    <TableAlumnosTr item={item} index={index} />
                                ) : (<></>)

                            ))}

                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}