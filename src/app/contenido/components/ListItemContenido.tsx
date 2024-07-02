import React from "react";

interface ListItemProps {
  text: string;
  isLast: boolean;
  date: string;
}

const ListItemContenido: React.FC<ListItemProps> = ({ text, isLast, date }) => {
  return (
    <li className="relative pl-8 pr-8 mb-3 last:mb-0 flex items-center justify-between">
      <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-yellow-500 border-2 border-yellow-500"></div>
      {!isLast && (
        <div className="absolute left-1 top-5 w-0.5 h-full bg-yellow-500"></div>
      )}
      <span className="ml-4 opacity-70">{text}</span>
      <span className="opacity-30">{date}</span>
    </li>
  );
};

export default ListItemContenido;
