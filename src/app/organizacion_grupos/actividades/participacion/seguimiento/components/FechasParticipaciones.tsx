import { TypeParticipacion } from "@/app/types/participacion/TypeParticipacion";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import ConfirmationModal from "@/app/components/ConfirmationModal";

interface FechasParticipacionesProps {
  noPeriodo: number | undefined;
  fechasParticipaciones: string[] | null;
  participacionesAlumno: TypeParticipacion[] | null;
}

const FechasParticipaciones: React.FC<FechasParticipacionesProps> = ({
  fechasParticipaciones,
  noPeriodo,
  participacionesAlumno,
}) => {
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const titulo = `Trimestre ${noPeriodo}`;

  if (noPeriodo === undefined) {
    return null;
  }
  const closeModalConfirm = () => {
    setIsModalConfirmOpen(false);
  };

  const handleConfirm = async () => {
    setIsModalConfirmOpen(false);
  };

  const buscarCalificacion = (fechaBusqueda: string): number => {
    if (!participacionesAlumno) {
      return 0;
    }

    const participacion = participacionesAlumno.find(
      (p) => p.fecha === fechaBusqueda
    );

    return participacion ? participacion.calificacion : 0;
  };

  if (isModalConfirmOpen) {
    return (
      <ConfirmationModal
        isOpen={isModalConfirmOpen}
        onClose={closeModalConfirm}
        onConfirm={handleConfirm}
        message="¿Está seguro de eliminar la participación?"
      />
    );
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
              <p className="">
                <span className="dark:text-gray-600 text-slate-400">
                  Fecha{" "}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {fecha}
                </span>
              </p>
              <p className="mt-4">
                <span className="dark:text-gray-600 text-slate-400">
                  Calificación{" "}
                </span>
                <span className="dark:text-gray-200 text-3xl font-light">
                  {buscarCalificacion(fecha)}
                </span>
              </p>
              <div className="flex gap-6">
                <Image
                  className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none mr-3t 
                    cursor-pointer mt-4"
                  src="/remover.svg"
                  alt="remover"
                  width={28}
                  height={28}
                  onClick={() => setIsModalConfirmOpen(true)}
                />
                <Image
                  className="dark:filter dark:invert dark:opacity-75 opacity-40 filter-none mr-3t 
                    cursor-pointer mt-4"
                  src="/editar.svg"
                  alt="editar"
                  width={28}
                  height={28}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FechasParticipaciones;
