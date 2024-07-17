import React from "react";
import { SvgIcons } from "../svg/SvgIcons";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 dark:bg-white/10 backdrop-blur-sm flex 
    items-center justify-center p-4"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div
          className="flex justify-between items-center p-6 border-b border-gray-200 
        dark:border-gray-700"
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Confirmación
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 
          dark:text-gray-500 dark:hover:text-gray-400"
          >
            {<SvgIcons.X />}
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300">{message}</p>
        </div>
        <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm 
            font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 
            dark:hover:bg-gray-700 mr-3"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm 
            font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
