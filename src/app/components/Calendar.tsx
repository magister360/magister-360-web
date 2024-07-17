import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface CalendarProps {
  date: Date | null;
  setDate: (date: Date) => void;
  title: string;
}

const Calendar: React.FC<CalendarProps> = ({ date, setDate, title }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(date);
  const [isSelectingYear, setIsSelectingYear] = useState(false);
  const [isSelectingMonth, setIsSelectingMonth] = useState(false);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
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
  const years = Array.from(
    { length: 20 },
    (_, i) => currentDate.getFullYear() - 10 + i
  );

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(newDate);
    setDate(newDate);
  };

  const handleMonthChange = (monthIndex: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
    setIsSelectingMonth(false);
  };

  const handleYearChange = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setIsSelectingYear(false);
  };

  const toggleMonthSelection = () => {
    setIsSelectingMonth(!isSelectingMonth);
    setIsSelectingYear(false);
  };

  const toggleYearSelection = () => {
    setIsSelectingYear(!isSelectingYear);
    setIsSelectingMonth(false);
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("es", { month: "long" });
    const year = date.getFullYear();
    return `${day} de ${month} del ${year}`;
  };

  useEffect(() => {
    if (date) {
      setSelectedDate(date);
      setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
    } else {
      setSelectedDate(null);
      const now = new Date();
      setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1));
    }
  }, [date]);

  return (
    <div className="bg-white dark:bg-[#1a2c32] p-4 rounded-lg shadow-md w-80 h-[430px]">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      {selectedDate && (
        <div className="mb-4 mt-2 text-center">
          <p className="font-bold text-gray-800 dark:text-gray-400 text-xl">
            {formatDate(selectedDate)}
          </p>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={toggleMonthSelection}
          className="text-lg font-semibold text-gray-800
         dark:text-gray-200 hover:underline"
        >
          {currentDate.toLocaleString("default", { month: "long" })}
        </button>
        <button
          onClick={toggleYearSelection}
          className="text-lg font-semibold text-gray-800
         dark:text-gray-200 hover:underline"
        >
          {currentDate.getFullYear()}
        </button>
      </div>

      {isSelectingMonth && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => handleMonthChange(index)}
              className="p-2 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-700
               text-gray-800 dark:text-gray-200"
            >
              {month}
            </button>
          ))}
        </div>
      )}

      {isSelectingYear && (
        <div className="grid grid-cols-4 gap-2 mb-4">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => handleYearChange(year)}
              className="p-2 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-700
               text-gray-800 dark:text-gray-200"
            >
              {year}
            </button>
          ))}
        </div>
      )}

      {!isSelectingMonth && !isSelectingYear && (
        <>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"].map((day) => (
              <div
                key={day}
                className="text-center font-medium text-gray-500 dark:text-gray-400"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={uuidv4()} />
            ))}
            {days.map((day) => {
              const date = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
              );
              const isSelected =
                selectedDate?.toDateString() === date.toDateString();
              return (
                <button
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className={`p-2 rounded-full text-sm ${
                    isSelected
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Calendar;
