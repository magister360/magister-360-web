import React from "react";

interface ProgressBarContenidoProps {
  progress: number;
}

const ProgressBarContenido: React.FC<ProgressBarContenidoProps> = ({
  progress,
}) => {
  return (
    <div className="flex mb-6">
      <div className="flex-1 w-full bg-gray-200 rounded-full h-4">
        <div
          className="flex-1  bg-yellow-500 h-full rounded-full opacity-75"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="flex-1 pl-4 dark:text-gray-500 text-gray-500">{`${progress}% completado`}</p>
    </div>
  );
};

export default ProgressBarContenido;
