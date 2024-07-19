import { StudenParticipacionType } from "@/app/types/participacion/TypeParticipacion";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

type Props = {
  readonly students: StudenParticipacionType[] | null;
};

export default function TableAlumnosParticipacion({ students }: Props) {
  return (
    <>
      {students !== null && students.length !== 0 && (
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
                <th scope="col" className="w-4 px-6 py-3 cursor-default">
                  No. lista
                </th>
                <th scope="col" className="px-6 py-3 cursor-default">
                  Nombres
                </th>
                <th scope="col" className=" px-6 py-3 cursor-default">
                  Calificación
                </th>
                <th scope="col" className="px-6 py-3 min-w-[20px] cursor-default">
                  Editar
                </th>
                <th scope="col" className="px-6 py-3 min-w-[20px] cursor-default">
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={uuidv4()}
                  className="border-b dark:bg-[#1a2c32] bg-[#ffffff]
                                    dark:border-gray-700 hover:bg-[#e6e6e6] 
                                    dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center cursor-default">{student.noLista}</div>
                  </td>
                  <td
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap 
                    dark:text-white"
                  >
                    <div className="ps-3">
                      <div className="text-base font-semibold cursor-default">
                        {student.nombre}
                      </div>
                      <div className="font-normal text-gray-500 cursor-default">
                        {student.apellidoPaterno} {student.apellidoMaterno}
                      </div>
                    </div>
                  </td>

                  <td className=" px-6 ">
                    <span className="cursor-default">10</span>
                  </td>
                  <td className=" px-6 ">
                    <Image
                      className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none mr-3t 
                    cursor-pointer mt-4"
                      src="/editar.svg"
                      alt="editar"
                      width={28}
                      height={28}
                    />
                  </td>
                  <td className=" px-6  ">
                    <Image
                      className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none mr-3t 
                    cursor-pointer mt-4"
                      src="/remover.svg"
                      alt="remover"
                      width={28}
                      height={28}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
