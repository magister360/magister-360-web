"use client";
import React, { useState } from "react";

interface Week {
  id: string;
  days: (number | null)[];
  content: string;
  month: string;
  mergedTo?: string;
  mergedFrom?: string[];
  startDate: Date;
  endDate: Date;
}

interface EditableCalendarProps {
  startDate: Date;
  endDate: Date;
  initialData: { content: string }[];
  onSave: (data: { startDate: Date; endDate: Date; content: string }[]) => void;
}

const EditableCalendar: React.FC<EditableCalendarProps> = ({
  startDate,
  endDate,
  initialData,
  onSave,
}) => {
  const [weeks, setWeeks] = useState<Week[]>(
    generateWeeks(startDate, endDate, initialData)
  );

  const handleTextChange = (
    id: string,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newWeeks = weeks.map((week) =>
      week.id === id ? { ...week, content: event.target.value } : week
    );
    setWeeks(newWeeks);
  };

  const handleMergeWeeks = (startIndex: number) => {
    const newWeeks = [...weeks];
    let primaryWeek = newWeeks[startIndex];

    while (primaryWeek.mergedTo) {
      const mergedToWeek = newWeeks.find((w) => w.id === primaryWeek.mergedTo);
      if (!mergedToWeek) break;
      primaryWeek = mergedToWeek;
    }

    let nextIndex = startIndex + 1;
    while (nextIndex < newWeeks.length && newWeeks[nextIndex].mergedTo) {
      nextIndex++;
    }
    if (nextIndex < newWeeks.length) {
      let currentWeek = newWeeks[nextIndex];
      primaryWeek.content += " " + currentWeek.content;
      primaryWeek.mergedFrom = [
        ...(primaryWeek.mergedFrom || []),
        currentWeek.id,
      ];
      primaryWeek.endDate = currentWeek.endDate;
      currentWeek.mergedTo = primaryWeek.id;
      currentWeek.content = "";
    }

    setWeeks(newWeeks);
  };

  const handleUnmergeWeeks = (index: number) => {
    const newWeeks = [...weeks];
    const currentWeek = newWeeks[index];

    if (currentWeek.mergedFrom && currentWeek.mergedFrom.length > 0) {
      const lastMergedId =
        currentWeek.mergedFrom[currentWeek.mergedFrom.length - 1];
      const lastMergedWeek = newWeeks.find((w) => w.id === lastMergedId);

      if (lastMergedWeek) {
        delete lastMergedWeek.mergedTo;
        currentWeek.mergedFrom.pop();
        currentWeek.endDate = new Date(lastMergedWeek.startDate);
        currentWeek.endDate.setDate(currentWeek.endDate.getDate() - 1);

        if (currentWeek.mergedFrom.length === 0) {
          delete currentWeek.mergedFrom;
        }

        const contentWords = currentWeek.content.split(" ");
        const wordsPerWeek = Math.ceil(contentWords.length / 2);
        lastMergedWeek.content = contentWords.slice(wordsPerWeek).join(" ");
        currentWeek.content = contentWords.slice(0, wordsPerWeek).join(" ");
      }

      setWeeks(newWeeks);
    }
  };

  const canMergeWith = (index: number): boolean => {
    if (index >= weeks.length - 1) return false;
    const nextWeek = weeks[index + 1];
    return !nextWeek.mergedTo;
  };

  const handleSave = () => {
    const savedData = weeks
      .filter((week) => !week.mergedTo)
      .map((week) => ({
        startDate: week.startDate,
        endDate: week.endDate,
        content: week.content,
      }));
    onSave(savedData);
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="border border-gray-200 dark:border-gray-700 p-2">
              Mes
            </th>
            <th className="border border-gray-200 dark:border-gray-700 p-2">
              L
            </th>
            <th className="border border-gray-200 dark:border-gray-700 p-2">
              M
            </th>
            <th className="border border-gray-200 dark:border-gray-700 p-2">
              M
            </th>
            <th className="border border-gray-200 dark:border-gray-700 p-2">
              J
            </th>
            <th className="border border-gray-200 dark:border-gray-700 p-2">
              V
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
          {weeks.map((week, index) => (
            <tr key={week.id} className={week.mergedTo ? "opacity-50" : ""}>
              <td className="border border-gray-200 dark:border-gray-700 p-2 dark:text-white">
                {week.month}
              </td>
              {week.days.slice(0, 5).map((day, i) => (
                <td
                  key={i}
                  className="border border-gray-200 dark:border-gray-700 p-2 dark:text-white"
                >
                  {day}
                </td>
              ))}
              <td className="border border-gray-200 dark:border-gray-700 p-2">
                {!week.mergedTo && (
                  <textarea
                    className="w-full p-2 border border-gray-200 rounded dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    value={week.content}
                    onChange={(e) => handleTextChange(week.id, e)}
                  />
                )}
              </td>
              <td className="border border-gray-200 dark:border-gray-700 p-2">
                {canMergeWith(index) && (
                  <button
                    onClick={() => handleMergeWeeks(index)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-2"
                  >
                    Unir con siguiente
                  </button>
                )}
                {week.mergedFrom && week.mergedFrom.length > 0 && (
                  <button
                    onClick={() => handleUnmergeWeeks(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Desunir última
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Guardar
      </button>
    </div>
  );
};

const generateWeeks = (
  startDate: Date,
  endDate: Date,
  initialData: { content: string }[]
): Week[] => {
  const weeks: Week[] = [];
  let currentDate = new Date(startDate);

  // Ajustamos para que comience en el día correcto de la semana
  const dayOfWeek = currentDate.getDay();
  if (dayOfWeek !== 1) {
    // Si no es lunes
    const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    currentDate.setDate(currentDate.getDate() + daysUntilMonday);
  }

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  while (currentDate <= endDate) {
    const weekStartDate = new Date(currentDate);
    const weekEndDate = new Date(currentDate);
    weekEndDate.setDate(weekEndDate.getDate() + 4);

    const week: Week = {
      id: `week-${weeks.length}`,
      days: [],
      content: initialData[weeks.length]?.content || "",
      month: months[currentDate.getMonth()],
      startDate: weekStartDate,
      endDate: weekEndDate,
    };

    for (let i = 0; i < 5; i++) {
      if (currentDate >= startDate && currentDate <= endDate) {
        week.days.push(currentDate.getDate());
      } else {
        week.days.push(null);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Avanzamos al siguiente lunes
    currentDate.setDate(currentDate.getDate() + 2);

    weeks.push(week);
  }

  return weeks;
};

export default EditableCalendar;
