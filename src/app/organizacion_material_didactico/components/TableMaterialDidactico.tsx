"use client";

import Image from "next/image";
import { MaterialDidacticoType } from "@/app/types/types";

type Props = {
  materialDidacticos: MaterialDidacticoType[];
  selecttMaterialDidacticoType: React.Dispatch<
    React.SetStateAction<MaterialDidacticoType | null>
  >;
  handlesetNewMaterialDidacticoOpen: () => void;
  handleClickRemove: (id: string) => void;
};

export default function TableMaterialDidactico({
  materialDidacticos,
  selecttMaterialDidacticoType,
  handlesetNewMaterialDidacticoOpen,
  handleClickRemove,
}: Props) {
  const handleSelettMaterialDidactico = (
    materialDidactico: MaterialDidacticoType
  ) => {
    selecttMaterialDidacticoType(materialDidactico);
    handlesetNewMaterialDidacticoOpen();
  };

  return (
    <div className=" overflow-x-auto mb-4  mr-4 rounded-lg mt-4  dark:bg-[#18181B] bg-[#ffffff]">
      <div
        className="max-w-full flex items-center justify-end 
                dark:bg-[#18181B] bg-[#ffffff]"
      >
        <input
          type="text"
          id="text-grupo"
          className="bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                                 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-blue-500 
                                  dark:focus:border-blue-500 m-4 max-w-sm"
          placeholder="Buscar por título..."
        />
      </div>
      <div className="min-w-[800px] rounded-lg">
        <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
          <thead className="text-xs uppercase dark:bg-[#2d464c] bg-gray-50 dark:text-gray-300 text-black rounded-t-xl">
            <tr>
              <th scope="col" className="px-4 py-3 w-1/3 sm:w-[30%]">
                Titulo
              </th>
              <th scope="col" className="px-4 py-3 w-1/3 sm:w-[40%]">
                Descripción
              </th>
              <th scope="col" className="px-4 py-3 w-1/6 sm:w-[10%]">
                Tipo
              </th>
              <th
                scope="col"
                className="px-4 py-3 w-1/12 sm:w-[10%] text-center"
              >
                EDITAR
              </th>
              <th
                scope="col"
                className="px-4 py-3 w-1/12 sm:w-[10%] text-center"
              >
                ELIMINAR
              </th>
            </tr>
          </thead>
          <tbody className="rounded-b-lg overflow-hidden">
            {materialDidacticos && materialDidacticos.length > 0 ? (
              materialDidacticos.map((materialDidactico, index) => (
                <tr
                  key={index}
                  className="border-b dark:bg-[#1a2c32] bg-[#ffffff] dark:border-gray-700 hover:bg-[#e6e6e6] dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-2 overflow-hidden text-ellipsis whitespace-nowrap">
                    {materialDidactico.titulo}
                  </td>
                  <td className="px-4 py-2 overflow-hidden text-ellipsis whitespace-nowrap">
                    {materialDidactico.descripcion}
                  </td>
                  <td className="px-4 py-2 overflow-hidden text-ellipsis whitespace-nowrap">
                    {materialDidactico.tipo}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Image
                      className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none inline-block cursor-pointer"
                      src="/editar.svg"
                      alt="editar"
                      width={20}
                      height={20}
                      priority
                      onClick={() =>
                        handleSelettMaterialDidactico(materialDidactico)
                      }
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Image
                      className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none inline-block cursor-pointer"
                      src="/remover.svg"
                      alt="remover"
                      width={20}
                      height={20}
                      priority
                      onClick={() => handleClickRemove(materialDidactico.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center">
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
