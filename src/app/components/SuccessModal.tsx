import React from "react";

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  successMessage: string;
};

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  successMessage,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70 
        transition-opacity duration-300 ${isOpen ? "visible" : "hidden"}`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-green-500">Éxito</h2>
        <p className="text-gray-700">{successMessage}</p>
        <button
          type="button"
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
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

export default SuccessModal;
