import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Página no encontrada</p>
      <div className="space-x-4">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Volver
        </button>
        <Link href="/login" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300">
          Ir al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;