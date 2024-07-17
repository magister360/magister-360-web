import React from "react";
import { v4 as uuidv4 } from "uuid";

interface FechasParticipacionesProps {
  noPeriodo: number | undefined;
  fechasParticipaciones: string[] | null;
}

const FechasParticipaciones: React.FC<FechasParticipacionesProps> = ({
  fechasParticipaciones,
  noPeriodo,
}) => {
  const titulo = `Trimestre ${noPeriodo}`;

  if (noPeriodo === undefined) {
    return null;
  }

  return (
    <>
      <div className="bg-gradient-to-r from-blue-500 to-stone-900 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center text-white">{titulo}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {fechasParticipaciones?.map((fecha, index) => (
          <div
            key={uuidv4()}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex"
          >
            <div className="w-1 bg-blue-500 flex-shrink-0"></div>
            <div className="p-4 flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Participación {index + 1}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{fecha}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FechasParticipaciones;