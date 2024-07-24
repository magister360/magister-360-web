import { useState } from "react";
import { SvgIcons } from "../svg/SvgIcons";

interface CalificacionPuntoExtraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (calificacion: number) => void;
  calificacionInicial: number;
  titulo: string;
  selectedFecha?: string | null;
  noLista?: number;
}

export const CalificacionPuntoExtraModal: React.FC<
  CalificacionPuntoExtraModalProps
> = ({
  isOpen,
  onClose,
  onSave,
  calificacionInicial,
  titulo,
  selectedFecha,
  noLista,
}) => {
  const [calificacion, setCalificacion] = useState<number | null>(
    calificacionInicial
  );
  const opciones = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1, 2];

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-90 flex justify-center 
    items-center z-50"
    >
      <div className=" bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div
          className="flex justify-between items-center pt-0 pb-2 border-b border-gray-200 
        dark:border-gray-700"
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {titulo}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 
          dark:text-gray-500 dark:hover:text-gray-400"
          >
            {<SvgIcons.X />}
          </button>
        </div>
        <div className="pt-4 pb-4">
          {selectedFecha && (
            <p>
              <span className="dark:text-gray-500">Fecha:</span>
              <span className="font-light "> {selectedFecha}</span>
            </p>
          )}

          {noLista && (
            <p>
              <span className="dark:text-gray-500">No lista:</span>
              <span className="font-light "> {noLista}</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {opciones.map((opcion) => (
            <button
              key={opcion}
              onClick={() => setCalificacion(opcion)}
              className={`cursor-pointer border dark:border-gray-600 rounded-lg p-4 
                    text-center transition-colors ${
                      calificacion === opcion
                        ? "bg-blue-500 dark:bg-blue-600 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                    }`}
            >
              {opcion}
            </button>
          ))}
        </div>
        <div className="text-left mb-4 text-gray-900 dark:text-gray-100">
          {calificacion !== null && (
            <p>
              <span className="dark:text-gray-500">Calificación:</span>
              <span className="font-light text-2xl"> {calificacion}</span>
            </p>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm 
            font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 
            dark:hover:bg-gray-700 mr-3"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              if (calificacion !== null) {
                onSave(calificacion);
                handleClose();
              }
            }}
            className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded
               hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
