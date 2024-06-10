// LoadingSpinner.tsx
import React from 'react';

interface LoadingSpinnerProps {
    message?: string; 
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Cargando..." }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center 
        bg-white bg-opacity-80 z-50">
            <div className="flex flex-col items-center">
                <div className="border-8 border-t-8 border-gray-200 
                border-t-black rounded-full w-16 h-16 animate-spin"></div>
                <div className="mt-2 text-lg text-black">{message}</div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
