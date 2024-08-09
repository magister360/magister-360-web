import React from 'react';

interface CardperiodoTituloProps {
  titulo: string;
}

const CardPeriodoTitulo: React.FC<CardperiodoTituloProps> = ({ titulo }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-stone-900 rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold text-center text-white cursor-default">
        {titulo}
      </h2>
    </div>
  );
};

export default CardPeriodoTitulo;