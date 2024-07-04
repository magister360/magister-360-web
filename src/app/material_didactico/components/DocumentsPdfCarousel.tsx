"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { DocumentsHook } from "./hooks/DocumentsHook";
import { MaterialDidacticoType } from "@/app/types/types";
import { DocumentTypeValues } from "@/app/utils/DocumentTypeValues";
import { getYouTubeThumbnail } from "@/app/utils/URLYouTube";

const TOTAL_VIDEOS = 4;

interface DocumentsPdfCarouselProps {
  videosDocument: MaterialDidacticoType[];
  setSelectTypeDocument: React.Dispatch<
    React.SetStateAction<MaterialDidacticoType | undefined>
  >;

  scrollToTop: () => void;
}

const handleSelectVideo = (
  index: number,
  documents: MaterialDidacticoType[],
  setSelectTypeDocument: React.Dispatch<
    React.SetStateAction<MaterialDidacticoType | undefined>
  >,
  scrollToTop: () => void
) => {
  if (documents.length !== 0) {
    const selectPdf = documents[index];
    setSelectTypeDocument(selectPdf);
    scrollToTop();
  }
};

const filterTipoMaterialDidactico = (
  materiales: MaterialDidacticoType[],
  tipo: string
): MaterialDidacticoType[] => {
  return materiales.filter((material) => {
    return material.tipo.toLowerCase() === tipo.toLowerCase();
  });
};

const DocumentsPdfCarousel: React.FC<DocumentsPdfCarouselProps> = ({
  videosDocument,
  setSelectTypeDocument,
  scrollToTop,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const documents = filterTipoMaterialDidactico(
    videosDocument,
    DocumentTypeValues.PDF.type
  );

  const { nextSlide, prevSlide } = DocumentsHook({
    setCurrentIndex,
    TOTAL_VIDEOS: TOTAL_VIDEOS,
    slidesLength: documents.length,
  });

  return (
    <>
      <h3 className="mt-6 ml-80 block text-gray-700 dark:text-gray-200 font-bold text-xl ">
        Documentos pdf
      </h3>

      <div
        id="youtube-carousel"
        className="ml-72 mt-0 mr-4 relative w-full max-w-[calc(100%-18rem)]  mx-auto"
      >
        <div className="overflow-hidden rounded-lg mr-4 p-4">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 25}%)` }}
          >
            {documents.map((document, index) => (
              <div
                key={index}
                className="w-1/4 flex-shrink-0 p-2 flex container-documents h-80"
                onClick={() =>
                  handleSelectVideo(
                    index,
                    documents,
                    setSelectTypeDocument,
                    scrollToTop
                  )
                }
              >
                <div
                  className="rounded-lg overflow-hidden  shadow-md
                 bg-white dark:bg-[#ddeff0] flex flex-col flex-grow 
                 transition-transform duration-300  hover:scale-110 hover:z-20 hover:rounded-2xl"
                >
                  <div className="h-48 max-h-48 overflow-hidden">
                    <Image
                      src={DocumentTypeValues.PDF.icon}
                      alt={"Pdf"}
                      width={320}
                      height={180}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow h-50 max-h-50">
                    <h3 className="text-lg font-semibold mb-2 dark:text-gray-600 overflow-hidden h-50 max-h-50">
                      {document.titulo}
                    </h3>
                   
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

export default DocumentsPdfCarousel;
