import React from "react";

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
     w-screen h-screen bg-black bg-opacity-50">
      <div className="relative">
        <div className="w-20 h-20 border-8 border-blue-500 border-solid 
        rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-20 h-20 border-8 
        border-white border-t-transparent border-solid rounded-full 
        animate-spin "></div>
      </div>
    </div>
  );
};

export default Loading;
