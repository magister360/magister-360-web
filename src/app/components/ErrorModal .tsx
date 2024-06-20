import React from "react";

type ErrorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
};

const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  errorMessage,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70 
        transition-opacity duration-300 ${isOpen ? "visible" : "hidden"}`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-red-500">Error</h2>
        <p className="text-gray-700">{errorMessage}</p>
        <button 
          type="button"
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
          onClick={() => {
            onClose();
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
