"use client";
import { useCallback, useEffect, useRef, useState } from "react";

import YouTubePlayer from "./components/YouTubePlayer";
import { DocumentTypeValues } from "../utils/DocumentTypeValues";

import { loadSelectionGGMFromLocalStorage } from "../selection/SelectionGGMCookies";
import { MaterialDidacticoType } from "../types/types";
import VideosYouTubeCarousel from "./components/VideosYouTubeCarousel";
import { fechSearchMaterialTitulo } from "./controller/MaterialDidacticoController";
import VideosCarousel from "./components/VideosCarousel";
import DiapositivasCarousel from "./components/DiapositivasCarousel";
import DocumentsWordCarousel from "./components/DocumentsWordCarousel";
import DocumentsPdfCarousel from "./components/DocumentsPdfCarousel";

export default function MaterialDidactico() {


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [videosDocument, setMaterialDidacticoType] = useState<
    MaterialDidacticoType[]
  >([]);

  const [selectTypeDocument, setSelectTypeDocument] = useState<
    MaterialDidacticoType | undefined
  >(undefined);

  useEffect(() => {
    const fechMaterialDidactico = async () => {
      const sesionLocalStorage = loadSelectionGGMFromLocalStorage();

      if (sesionLocalStorage !== null) {
        const { idGrado, idGrupo, idMateria } = sesionLocalStorage;

        try {
          const materiales = await fechSearchMaterialTitulo(
            idGrado,
            idGrupo,
            idMateria,
            "ecuaciones"
          );

          setMaterialDidacticoType(materiales);
        } catch (error) {}
      }
    };
    fechMaterialDidactico();
  }, []);

  const existYoutubeVideos = videosDocument.some((video) =>
    video.tipo
      .toLowerCase()
      .includes(DocumentTypeValues.YOUTUBE.type.toLowerCase())
  );
  const existVideos = videosDocument.some((video) =>
    video.tipo
      .toLowerCase()
      .includes(DocumentTypeValues.VIDEO.type.toLowerCase())
  );

  const existDiapositivas = videosDocument.some((docuemnt) =>
    docuemnt.tipo
      .toLowerCase()
      .includes(DocumentTypeValues.DIAPOSITIVAS.type.toLowerCase())
  );

  const existWord = videosDocument.some((docuemnt) =>
    docuemnt.tipo
      .toLowerCase()
      .includes(DocumentTypeValues.WORD.type.toLowerCase())
  );

  const existPdf = videosDocument.some((docuemnt) =>
    docuemnt.tipo
      .toLowerCase()
      .includes(DocumentTypeValues.PDF.type.toLowerCase())
  );

  return (
    <div className=" max-h-full h-full">
      {selectTypeDocument !== undefined &&
        selectTypeDocument.url !== "" &&
        selectTypeDocument.tipo === DocumentTypeValues.YOUTUBE.type && (
          <YouTubePlayer videoId={selectTypeDocument.url} />
        )}
      {selectTypeDocument !== undefined &&
        selectTypeDocument.url !== "" &&
        selectTypeDocument.tipo !== "" &&
        selectTypeDocument.titulo !== "" && (
          <div className="mb-4 ml-80">
            <h3 className="mt-4  block text-gray-700 dark:text-gray-200 font-bold text-xl ">
              {selectTypeDocument.titulo}
            </h3>
            <p className="text-gray-500"> {selectTypeDocument.descripcion}</p>
          </div>
        )}
      {existYoutubeVideos && (
        <VideosYouTubeCarousel
          videosDocument={videosDocument}
          setSelectTypeDocument={setSelectTypeDocument}
          scrollToTop={scrollToTop}
        />
      )}
      {existVideos && (
        <VideosCarousel
          videosDocument={videosDocument}
          setSelectTypeDocument={setSelectTypeDocument}
          scrollToTop={scrollToTop}
        />
      )}

      {existDiapositivas && (
        <DiapositivasCarousel
          videosDocument={videosDocument}
          setSelectTypeDocument={setSelectTypeDocument}
          scrollToTop={scrollToTop}
        />
      )}
      {existWord && (
        <DocumentsWordCarousel
          videosDocument={videosDocument}
          setSelectTypeDocument={setSelectTypeDocument}
          scrollToTop={scrollToTop}
        />
      )}

      {existPdf && (
        <DocumentsPdfCarousel
          videosDocument={videosDocument}
          setSelectTypeDocument={setSelectTypeDocument}
          scrollToTop={scrollToTop}
        />
      )}
    </div>
  );
}
