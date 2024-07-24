import React from "react";

interface CalificacionCircleProps {
  calificacion: number;
  isDecimal: boolean;
}

const CalificacionCircle: React.FC<CalificacionCircleProps> = ({
  calificacion,
  isDecimal,
}) => {
  const getColor = () => {
    if (isDecimal) {
      if (calificacion > 0) return "from-green-600 to-green-400";
      return "from-red-600 to-red-400";
    }

    if (calificacion >= 9) return "from-green-600 to-green-400";
    if (calificacion >= 6) return "from-yellow-600 to-yellow-400";
    if (calificacion === 5) return "from-orange-600 to-orange-400";
    return "from-red-600 to-red-400";
  };

  return (
    <div
      className={`relative w-10 h-10 rounded-full ${getColor()} bg-gradient-to-br 
    shadow-lg flex items-center justify-center overflow-hidden`}
    >
      <div className="absolute inset-0 bg-white opacity-25 rounded-full"></div>
      <div className="absolute inset-0 bg-black opacity-10 rounded-full shadow-inner"></div>
      <span className="relative text-white text-lg font-bold z-10">
        {calificacion}
      </span>
    </div>
  );
};

export default CalificacionCircle;
