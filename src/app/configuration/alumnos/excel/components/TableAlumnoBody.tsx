import EAN13Barcode from "@/app/components/EAN13BarcodeProps";
import { TypeIndexXlsAlumnos } from "../TypeIndexXlsAlumnos";
import StatusAlumno from "../../components/StatusAlumno";

interface TableAlumnosTrProps {
    item: any[];
    index: number;
}

export const TableAlumnosTr: React.FC<TableAlumnosTrProps> = ({ item, index }) => {

    return (
        <tr key={index} className="border-b dark:bg-[#1a2c32] bg-[#ffffff]
        dark:border-gray-700 hover:bg-[#e6e6e6] dark:hover:bg-gray-600">

            <td className="w-4 p-4">
                <div className="flex items-center">
                    {item[TypeIndexXlsAlumnos.INDEX_NO_LISTA]}
                </div>

            </td>
            <td scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">

                <div className="ps-3">
                    <div className="text-base font-semibold">{item[TypeIndexXlsAlumnos.INDEX_NOMBRE]}</div>
                    <div className="font-normal text-gray-500">{item[TypeIndexXlsAlumnos.INDEX_APELLIDO_PATERNO]} {item[TypeIndexXlsAlumnos.INDEX_APELLIDO_MATERNO]}</div>
                </div>
            </td>

            <td className="w-4 p-4">
                <div className="flex items-center">
                    <EAN13Barcode value={item[TypeIndexXlsAlumnos.INDEX_BARCODE]} heightBarcode={30} />
                </div>

            </td>

            <td className="px-6 py-4 min-w-[20px]">
                <StatusAlumno value={0} />
            </td>


        </tr>

    )
}