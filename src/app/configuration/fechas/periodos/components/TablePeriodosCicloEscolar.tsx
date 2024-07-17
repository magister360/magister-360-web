import { PeriodoEvaluacion } from "@/app/types/periodos_evaluacion/TypePeriodosEvaluacion";
import { formatDateStr } from "@/app/utils/DateUtils";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

type Props = {
  readonly periodos: PeriodoEvaluacion[] | null;
  readonly setSelectedDateStart: React.Dispatch<
    React.SetStateAction<Date | null>
  >;
  readonly setSelectedDateEnd: React.Dispatch<
    React.SetStateAction<Date | null>
  >;
  readonly setNoPeriodo: React.Dispatch<React.SetStateAction<number>>;
  readonly setId: React.Dispatch<React.SetStateAction<string | undefined>>;
  readonly setIsModalConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TablePeriodosCicloEscolar({
  periodos,
  setSelectedDateStart,
  setSelectedDateEnd,
  setNoPeriodo,
  setId,
  setIsModalConfirmOpen
}: Props) {
  const handleChangeDateStartEnd = (
    dateStart: string,
    dateEnd: string,
    noPeriodo: number,
    id: string
  ) => {
    setSelectedDateStart(new Date(dateStart));
    setSelectedDateEnd(new Date(dateEnd));
    setNoPeriodo(noPeriodo);
    setId(id);
  };

  const handleChangeDelete = (id: string) => {
    setId(id);
    setIsModalConfirmOpen(true)
  };

  return (
    <div
      className="rounded-lg shadow  
        sm:max-w-full  dark:bg-[#18181B] bg-[#ffffff]  pt-2 pb-4 pr-0  "
    >
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg  mt-3 ">
        <table
          className="w-full text-sm text-left rtl:text-right text-gray-500
                                        dark:text-gray-400"
        >
          <thead
            className="border-b text-xs  uppercase  
                                        dark:bg-[#2d464c] bg-gray-50  dark:text-gray-300
                                         text-black"
          >
            <tr>
              <th scope="col" className="px-6 py-3">
                No. periodo
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha inicial
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha final
              </th>
              <th scope="col" className="px-6 py-3 min-w-[10px]">
                Editar
              </th>
              <th scope="col" className="px-6 py-3 min-w-[10px]">
                Remover
              </th>
            </tr>
          </thead>

          <tbody>
            {periodos?.map((periodo, index) => (
              <tr
                key={uuidv4()}
                className="border-b dark:bg-[#1a2c32] bg-[#ffffff]
                            dark:border-gray-700 hover:bg-[#e6e6e6]
                             dark:hover:bg-gray-600"
              >
                <td className="px-6 py-3">
                  <div className="flex items-center">{periodo.noPeriodo}</div>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center">
                    {formatDateStr(periodo.fechaInicial)}
                  </div>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center">
                    {formatDateStr(periodo.fechaFinal)}
                  </div>
                </td>
                <td className="px-6 py-4 min-w-[10px] ">
                  <Image
                    className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none mr-3t 
                    cursor-pointer"
                    src="/editar.svg"
                    alt="editar"
                    width={28}
                    height={28}
                    onClick={() =>
                      handleChangeDateStartEnd(
                        periodo.fechaInicial,
                        periodo.fechaFinal,
                        periodo.noPeriodo,
                        periodo.id
                      )
                    }
                  />
                </td>
                <td className="px-6 py-4 min-w-[10px] ">
                  <Image
                    className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none mr-3t 
                    cursor-pointer"
                    src="/remover.svg"
                    alt="remover"
                    width={28}
                    height={28}
                    onClick={() => handleChangeDelete(periodo.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
