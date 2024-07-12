import React from "react";

interface GenericButtonProps {
  readonly type?: "button" | "submit" | "reset";
  readonly onClick: () => void;
  readonly buttonText: string;
  readonly additionalClassName?: string;
}

export default function GenericButton({
  type = "button",
  onClick,
  buttonText,
  additionalClassName = "",
}: GenericButtonProps): JSX.Element {
  const baseClassName = `w-full text-white bg-[#438e96] hover:bg-[#3b757f] 
                         focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                         dark:bg-[#438e96] dark:hover:bg-[#3b757f]`;

  return (
    <button
      type={type}
      className={`${baseClassName} ${additionalClassName}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}
