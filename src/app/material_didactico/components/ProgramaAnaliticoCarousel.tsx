"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { DocumentsHook } from "./hooks/DocumentsHook";
import { MaterialDidacticoType } from "@/app/types/types";
import { DocumentTypeValues } from "@/app/utils/DocumentTypeValues";
import { fetchOpenWord } from "../controller/MaterialDidacticoController";

const TOTAL_VIDEOS = 4;

interface ProgramaAnaliticoCarouselProps {
  videosDocument: MaterialDidacticoType[];
  setSelectTypeDocument: React.Dispatch<
    React.SetStateAction<MaterialDidacticoType | undefined>
  >;
}

const filterTipoMaterialDidactico = (
  materiales: MaterialDidacticoType[],
  tipo: string
): MaterialDidacticoType[] => {
  return materiales.filter((material) => {
    return material.tipo.toLowerCase() === tipo.toLowerCase();
  });
};

const ProgramaAnaliticoCarousel: React.FC<ProgramaAnaliticoCarouselProps> = ({
  videosDocument,
  setSelectTypeDocument,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const openWord = async (wordPath: string) => {
    const menssage = await fetchOpenWord(wordPath);
    setSelectTypeDocument(undefined);
  };

  const documents = filterTipoMaterialDidactico(
    videosDocument,
    DocumentTypeValues.WORD.type
  );

  const { nextSlide, prevSlide } = DocumentsHook({
    setCurrentIndex,
    TOTAL_VIDEOS: TOTAL_VIDEOS,
    slidesLength: documents.length,
  });

  return (
    <>
      <h3 className="mt-6 ml-80 block text-gray-700 dark:text-gray-200 font-bold text-xl ">
        Documentos word
      </h3>

      <div className="ml-72 mt-0 mr-4 relative w-full max-w-[calc(100%-18rem)]  mx-auto">
        <div className="overflow-hidden rounded-lg mr-4 p-4">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 25}%)` }}
          >
            {documents.map((document, index) => (
              <div
                key={index}
                className="w-1/4 flex-shrink-0 p-2 flex container-documents "
                onClick={() => openWord(document.url)}
              >
                <div
                  className="rounded-lg overflow-hidden  shadow-md
                 bg-white dark:bg-[#ddeff0] flex flex-col flex-grow 
                 transition-transform duration-300  hover:scale-110 hover:z-20 hover:rounded-2xl"
                >
                  <div className="h-48 overflow-hidden">
                    <Image
                      src={DocumentTypeValues.WORD.icon}
                      alt={"Word"}
                      width={320}
                      height={180}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow h-50">
                    <h3 className="text-lg font-semibold mb-2 dark:text-gray-600 overflow-hidden max-h-20">
                      {document.titulo}
                    </h3>
                    <p className="text-sm text-gray-600 overflow-hidden">
                      {document.descripcion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white "
          disabled={currentIndex === 0}
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
          disabled={currentIndex === documents.length - TOTAL_VIDEOS}
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-800" />
        </button>
      </div>
    </>
  );
};

export default ProgramaAnaliticoCarousel;
