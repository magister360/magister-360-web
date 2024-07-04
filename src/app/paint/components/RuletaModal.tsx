import React, { useState, useEffect } from 'react';

interface RuletaModalProps {
  alumnos: string[];
  isOpen: boolean;
  onClose: () => void;
}

const RuletaModal: React.FC<RuletaModalProps> = ({ alumnos, isOpen, onClose }) => {
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState<string | null>(null);
  const [girando, setGirando] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setAlumnoSeleccionado(null);
      setGirando(false);
    }
  }, [isOpen]);

  const girarRuleta = () => {
    setGirando(true);
    setTimeout(() => {
      const indiceAleatorio = Math.floor(Math.random() * alumnos.length);
      setAlumnoSeleccionado(alumnos[indiceAleatorio]);
      setGirando(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Ruleta de Alumnos</h2>
        <div className={`w-48 h-48 border-4 border-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center ${girando ? 'animate-spin' : ''}`}>
          {alumnoSeleccionado ? (
            <p className="text-xl font-bold">{alumnoSeleccionado}</p>
          ) : (
            <p className="text-gray-500">Presiona girar</p>
          )}
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={girarRuleta}
            disabled={girando}
            className={`px-4 py-2 rounded ${
              girando
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {girando ? 'Girando...' : 'Girar Ruleta'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RuletaModal;