import EAN13Barcode from "@/app/components/EAN13BarcodeProps";
import React from "react";
import StatusAlumno from "./StatusAlumno";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

type Item = {
  id: number;
  noLista: string;
  name: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  icon: string;
  estatus: number;
  codigoBarras: string;
};

type Props = {
  readonly itempNames: Item[];
};

export default function TableAlumnos({ itempNames }: Props) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-72 mt-14 mr-3">
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900"></div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
            <th scope="col" className="px-6 py-3 min-w-[20px]">
              Remover
            </th>
          </tr>
        </thead>
        <tbody>
          {itempNames.map((item, index) => (
            <tr
              key={uuidv4()}
              className="bg-white border-b dark:bg-gray-800
                         dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-3">
                <div className="flex items-center">
                  {index} {item.noLista}
                </div>
              </td>
              <td
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div className="ps-3">
                  <div className="text-base font-semibold">{item.name}</div>
                  <div className="font-normal text-gray-500">
                    {item.apellidoPaterno} {item.apellidoMaterno}
                  </div>
                </div>
              </td>

              <td className="w-4 p-4">
                <div className="flex items-center">
                  <EAN13Barcode value={item.codigoBarras} heightBarcode={30} />
                </div>
              </td>

              <td className="px-6 py-4 min-w-[20px]">
                <StatusAlumno value={item.estatus} />
              </td>
              <td className="px-6 py-4 min-w-[20px]">
                <Image
                  className="filter invert"
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
