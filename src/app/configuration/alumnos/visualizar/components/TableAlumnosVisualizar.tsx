import EAN13Barcode from "@/app/components/EAN13BarcodeProps";
import StatusAlumno from "../../components/StatusAlumno";
import { v4 as uuidv4 } from "uuid";

import Image from "next/image";
import { StudentType } from "@/app/types/types";

type Props = {
  readonly students: StudentType[];
  readonly handlesetNewModifyStudentOpen: (
    studentSelect: StudentType | undefined
  ) => void;
};

export default function TableAlumnosVisualizar({
  students,
  handlesetNewModifyStudentOpen,
}: Props) {
  return (
    
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
              <th scope="col" className="pl-2 py-3">
                No. lista
              </th>
              <th scope="col" className="pl-6 py-3">
                Nombres
              </th>
              <th scope="col" className="px-6 py-3">
                Código de barras
              </th>
              <th scope="col" className="px-6 py-3 min-w-[20px]">
                Status
              </th>
              <th scope="col" className="px-6 py-3 min-w-[20px]">
                Editar
              </th>
              <th scope="col" className="px-6 py-3 min-w-[20px]">
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody>
            {students && students.length > 0 ? (
              students.map((student, index) => (
                <tr
                  key={uuidv4()}
                  className="border-b dark:bg-[#1a2c32] bg-[#ffffff] dark:border-gray-700 hover:bg-[#e6e6e6] dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">{student.noLista}</div>
                  </td>
                  <td
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="ps-2">
                      <div className="flex space-x-3 items-center justify-center">
                        <div className="w-7 h-7 ">
                          <Image
                            className="rounded-full object-cover w-full h-full"
                            src={
                              student.foto
                                ? `data:image/jpeg;base64,${student.foto}`
                                : "/notPhoto.png"
                            }
                            alt={
                              student.foto
                                ? "foto del alumno"
                                : "foto predeterminada"
                            }
                            width={32}
                            height={32}
                            priority
                          />
                        </div>
                        <div>
                          <div className="text-base font-semibold">
                            {student.nombre}
                          </div>
                          <div className="font-normal text-gray-500">
                            {student.apellidoPaterno} {student.apellidoMaterno}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <EAN13Barcode
                        value={student.codigoBarras}
                        heightBarcode={15}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 min-w-[20px]">
                    <StatusAlumno value={student.estatus} />
                  </td>
                  <td className="px-6 py-4">
                    <Image
                      className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none"
                      src="/editar.svg"
                      alt="editar"
                      width={28}
                      height={28}
                      priority
                      onClick={() => handlesetNewModifyStudentOpen(student)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Image
                      className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none"
                      src="/remover.svg"
                      alt="remover"
                      width={28}
                      height={28}
                      priority
                    />
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    
  );
}
