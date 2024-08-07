import EAN13Barcode from "@/app/components/EAN13BarcodeProps";
import React from "react";

import { TypeIndexXlsAlumnos } from "../TypeIndexXlsAlumnos";
import StatusAlumno from "../../components/StatusAlumno";
import { v4 as uuidv4 } from "uuid";

type Props = {
  readonly data: any[][];
  readonly errorEncabezado: string;
};

export default function TableAlumnosExcel({ data, errorEncabezado }: Props) {
  return (
    <>
      {errorEncabezado === "" && data.length !== 0 && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg  mt-3 mr-3">
          <div
            className="flex items-center justify-between flex-column flex-wrap md:flex-row 
            space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900"
          ></div>
          <table
            className="w-full text-sm text-left rtl:text-right text-gray-500
                        dark:text-gray-400"
          >
            <thead
              className="border-b text-xs  uppercase  
                            dark:bg-[#2d464c] bg-gray-50  dark:text-gray-300 text-black"
            >
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
              {data.map((item, index) =>
                item[TypeIndexXlsAlumnos.INDEX_NOMBRE] !== undefined ? (
                  <tr
                    key={uuidv4()}
                    className="border-b dark:bg-[#1a2c32] bg-[#ffffff]
                                    dark:border-gray-700 hover:bg-[#e6e6e6] 
                                    dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        {item[TypeIndexXlsAlumnos.INDEX_NO_LISTA]}
                      </div>
                    </td>
                    <td
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="ps-3">
                        <div className="text-base font-semibold">
                          {item[TypeIndexXlsAlumnos.INDEX_NOMBRE]}
                        </div>
                        <div className="font-normal text-gray-500">
                          {item[TypeIndexXlsAlumnos.INDEX_APELLIDO_PATERNO]}{" "}
                          {item[TypeIndexXlsAlumnos.INDEX_APELLIDO_MATERNO]}
                        </div>
                      </div>
                    </td>

                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <EAN13Barcode
                          value={item[TypeIndexXlsAlumnos.INDEX_BARCODE]}
                          heightBarcode={15}
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4 min-w-[20px]">
                      <StatusAlumno value={0} />
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
