import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { Cronograma } from "@/app/types/cronograma/TypeCronograma";
import { InicioFinClases } from "@/app/types/inicio_fin_clases/TypeInicioFinClases";

interface EditableCalendarProps {
  cronogramas: Cronograma[] | null;
  inicioFinClases: InicioFinClases | null;
  initialData: { monthYear: string; contents: string[] }[];
}

const EditableCalendar: React.FC<EditableCalendarProps> = ({
  cronogramas,
  inicioFinClases,
  initialData,
}) => {
  const [monthsAndYears, setMonthsAndYears] = useState<string[]>([]);
  const [calendarData, setCalendarData] = useState<{ [key: string]: string[] }>(
    {}
  );

  useEffect(() => {
    if (inicioFinClases) {
      const monthYearList = getMonthsAndYears(inicioFinClases);
      setMonthsAndYears(monthYearList);

      // Initialize calendarData with initialData
      const initialCalendarData = initialData.reduce((acc, item) => {
        acc[item.monthYear] = item.contents;
        return acc;
      }, {} as { [key: string]: string[] });

      setCalendarData(initialCalendarData);
    }
  }, [inicioFinClases, initialData]);

  const getMonthsAndYears = (data: InicioFinClases): string[] => {
    const startDate = new Date(data.fechaInicial);
    const endDate = new Date(data.fechaFinal);
    const monthYearList: string[] = [];
    const monthNames = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const month = monthNames[currentDate.getMonth()];
      const year = currentDate.getFullYear();
      monthYearList.push(`${month}-${year}`);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return monthYearList;
  };

  const handleAddTextarea = (monthYear: string) => {
    setCalendarData((prevData) => ({
      ...prevData,
      [monthYear]: [...(prevData[monthYear] || []), ""],
    }));
  };

  const handleTextareaChange = (
    monthYear: string,
    index: number,
    value: string
  ) => {
    setCalendarData((prevData) => ({
      ...prevData,
      [monthYear]: prevData[monthYear].map((content, i) =>
        i === index ? value : content
      ),
    }));
  };

  const handleSave = () => {
    const dataToSave = monthsAndYears.map((monthYear) => ({
      monthYear,
      contents: calendarData[monthYear],
    }));
    console.log("Data to save:", dataToSave);
    // Here you would typically send this data to a server or parent component
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="border border-gray-200 dark:border-gray-700 p-2">
              Mes-año
            </th>
            <th className="border border-gray-200 dark:border-gray-700 p-2">
              CONTENIDOS
            </th>
            <th className="border border-gray-200 dark:border-gray-700 p-2">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {monthsAndYears.map((monthYear) => (
            <tr key={uuidv4()}>
              <td className="border border-gray-200 dark:border-gray-700 p-2">
                {monthYear}
              </td>
              <td className="border border-gray-200 dark:border-gray-700 p-2">
                {calendarData[monthYear]?.map((content, index) => (
                  <textarea
                    key={uuidv4()}
                    value={content}
                    onChange={(e) =>
                      handleTextareaChange(monthYear, index, e.target.value)
                    }
                    className="w-full px-3 py-2 mb-2 border bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-[#1a2c32] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                    rows={2}
                  />
                ))}
                <button
                  onClick={() => handleAddTextarea(monthYear)}
                  className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Image
                    className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none w-auto h-5 mr-1"
                    src="/add.svg"
                    alt="add"
                    width={20}
                    height={20}
                  />
                  Agregar contenido
                </button>
              </td>
              <td className="border border-gray-200 dark:border-gray-700 p-2">
                {/* Individual save button removed as we'll use a global save */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Guardar Todo
      </button>
    </div>
  );
};

export default EditableCalendar;