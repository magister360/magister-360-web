"use client";
import { useCallback, useEffect, useRef, useState } from "react";

import YouTubePlayer from "./components/YouTubePlayer";
import { DocumentTypeValues } from "../utils/DocumentTypeValues";

import { loadSelectionGGMFromLocalStorage } from "../selection/SelectionGGMCookies";
import { FileInfo, MaterialDidacticoType } from "../types/types";
import VideosYouTubeCarousel from "./components/VideosYouTubeCarousel";
import {
  fechSearchMaterialTitulo,
  fechSearchMaterialTituloEquipo,
} from "./controller/MaterialDidacticoController";
import VideosCarousel from "./components/VideosCarousel";
import DiapositivasCarousel from "./components/DiapositivasCarousel";
import DocumentsWordCarousel from "./components/DocumentsWordCarousel";
import DocumentsPdfCarousel from "./components/DocumentsPdfCarousel";
import VideoPlayer from "./components/VideoPlayer";

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
        const { idGrado, idGrupo, idMateria, grado, grupo, materia } =
          sesionLocalStorage;

        try {
          const materiales =
            (await fechSearchMaterialTitulo(
              idGrado,
              idGrupo,
              idMateria,
              "ecuaciones"
            )) || [];

          const diapositivasEquipo = await fechSearchMaterialTituloEquipo(
            grado,
            grupo,
            materia,
            DocumentTypeValues.DIAPOSITIVAS.type,
            "ecuaciones"
          );

          const videosEquipo = await fechSearchMaterialTituloEquipo(
            grado,
            grupo,
            materia,
            DocumentTypeValues.VIDEO.type,
            "TRIÁNGULO"
          );

          const wordsEquipo = await fechSearchMaterialTituloEquipo(
            grado,
            grupo,
            materia,
            DocumentTypeValues.WORD.type,
            "ecuaciones"
          );

          const pdfEquipo = await fechSearchMaterialTituloEquipo(
            grado,
            grupo,
            materia,
            DocumentTypeValues.PDF.type,
            "Manual"
          );

          const diapositivasEquipoConvert: MaterialDidacticoType[] | undefined =
            diapositivasEquipo?.map((mat: FileInfo, index: number) => {
              return {
                id: "",
                url: mat.path,
                titulo: mat.name,
                descripcion: "",
                miniatura: Buffer.from(""),
                regDate: new Date(),
                tipo: DocumentTypeValues.DIAPOSITIVAS.type,
              };
            }) || [];

          const videosEquipoConvert: MaterialDidacticoType[] | undefined =
            videosEquipo?.map((mat: FileInfo, index: number) => {
              return {
                id: "",
                url: mat.path,
                titulo: mat.name,
                descripcion: "",
                miniatura: Buffer.from(""),
                regDate: new Date(),
                tipo: DocumentTypeValues.VIDEO.type,
              };
            }) || [];

          const wordEquipoConvert: MaterialDidacticoType[] | undefined =
            wordsEquipo?.map((mat: FileInfo, index: number) => {
              return {
                id: "",
                url: mat.path,
                titulo: mat.name,
                descripcion: "",
                miniatura: Buffer.from(""),
                regDate: new Date(),
                tipo: DocumentTypeValues.WORD.type,
              };
            }) || [];

          const pdfEquipoConvert: MaterialDidacticoType[] | undefined =
            pdfEquipo?.map((mat: FileInfo, index: number) => {
              return {
                id: "",
                url: mat.path,
                titulo: mat.name,
                descripcion: "",
                miniatura: Buffer.from(""),
                regDate: new Date(),
                tipo: DocumentTypeValues.PDF.type,
              };
            }) || [];

          const materialesDiapositivas = [
            ...materiales,
            ...diapositivasEquipoConvert,
          ];

          const materialesVideos = [
            ...materialesDiapositivas,
            ...videosEquipoConvert,
          ];

          const materialesWords = [...materialesVideos, ...wordEquipoConvert];

          const materialesPdfs = [...materialesWords, ...pdfEquipoConvert];

          setMaterialDidacticoType(materialesPdfs);
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
        selectTypeDocument.tipo === DocumentTypeValues.VIDEO.type && (
          <VideoPlayer videoPath={selectTypeDocument.url} />
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