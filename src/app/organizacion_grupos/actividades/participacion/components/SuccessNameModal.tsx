import React, { useEffect } from "react";

type SuccessNameModalProps = {
  isOpen: boolean;
  onClose: () => void;
  successMessage: string;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
  name: string;
};

const SuccessNameModal: React.FC<SuccessNameModalProps> = ({
  isOpen,
  onClose,
  successMessage,
  setSuccessMessage,
  name,
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
        setSuccessMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, setSuccessMessage]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70 
        transition-opacity duration-300 ${isOpen ? "visible" : "hidden"}`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-green-500">Éxito</h2>
        <h3 className="text-gray-700 font-bold text-2xl mt-4 mb-4 "> {name}</h3>
        <p className="text-gray-700">{successMessage}</p>

       
      </div>
    </div>
  );
};

export default SuccessNameModal;
