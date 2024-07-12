"use client";

import Image from "next/image";

interface CardProps {
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly title: string;
  readonly description: string;
  readonly children: React.ReactNode;
}

export default function Card({
  imageSrc,
  imageAlt,
  title,
  description,
  children,
}: CardProps) {
  return (
    <div
      className="w-full max-w-sm bg-white border border-gray-200 dark:bg-[#18181B] 
    rounded-lg shadow dark:border-gray-700"
    >
      <div className="h-24 max-h-24 flex justify-center items-center">
        <Image
          className="dark:opacity-100 opacity-50"
          src={imageSrc}
          alt={imageAlt}
          width={100}
          height={50}
        />
      </div>

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <div className="flex flex-col space-y-4 w-full">{children}</div>
      </div>
    </div>
  );
}
