import React from 'react';

interface CustomAlertProps {
  message: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message }) => {
  return (
    <div className="flex items-center p-4 border border-gray-300 rounded bg-gray-100">
      {<span className="mr-2 text-xl"></span>}
      <span className="text-lg">{message}</span>
    </div>
  );
};

export default CustomAlert;

