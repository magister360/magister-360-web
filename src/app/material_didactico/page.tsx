"use client";
import { useEffect, useState } from "react";
import YouTubePlayer from "./components/YouTubePlayer";
import { DocumentTypeValues } from "../utils/DocumentTypeValues";
import { loadSelectionGGMFromLocalStorage } from "../selection/SelectionGGMCookies";
import { FileInfo, MaterialDidacticoType } from "../types/types";
import VideosYouTubeCarousel from "./components/VideosYouTubeCarousel";
import {
  fechSearchMaterialTitulo,
  fechSearchMaterialTituloEquipo,
  fetchFilesContentWord,
} from "./controller/MaterialDidacticoController";
import VideosCarousel from "./components/VideosCarousel";
import DocumentsPdfCarousel from "./components/DocumentsPdfCarousel";
import VideoPlayer from "./components/VideoPlayer";
import PDFViewer from "./components/PDFViewer";
import Loading from "../components/Loading";
import WordsMaterialCarousel from "./components/WordsMaterialCarousel";
import { TextMaterialDidactico } from "../constants/texts_material_diadctico/TextMaterialDidactico";

export default function MaterialDidactico() {
  const scrollToTop = () => {
    setIsLoading(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsLoading(false);
  };

  const [videosDocument, setVideosDocument] = useState<MaterialDidacticoType[]>(
    []
  );

  const [selectTypeDocument, setSelectTypeDocument] = useState<
    MaterialDidacticoType | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fechMaterialDidactico = async () => {
      setIsLoading(true);
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

          const arrayTypesWords = [
            DocumentTypeValues.PROGRAMA_ANALITICO.type,
            DocumentTypeValues.CRONOGRAMAS.type,
            DocumentTypeValues.PLANEACION_DIDACTICA.type,
            DocumentTypeValues.PROYECTOS.type,
            DocumentTypeValues.EVALUACION_FORMATIVA.type,
          ];
          const wordsMaterialEquipo = await fetchFilesContentWord(
            grado,
            grupo,
            materia,
            arrayTypesWords
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

          const wordsMaterialEquipoConvert:
            | MaterialDidacticoType[]
            | undefined =
            wordsMaterialEquipo?.map((mat: FileInfo, index: number) => {
              console.log("tipo " + mat.tipo);
              return {
                id: "",
                url: mat.path,
                titulo: mat.name,
                descripcion: "",
                miniatura: Buffer.from(""),
                regDate: new Date(),
                tipo: mat.tipo,
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

          const materialeswordsMaterialEquipo = [
            ...materialesPdfs,
            ...wordsMaterialEquipoConvert,
          ];

          setVideosDocument(materialeswordsMaterialEquipo);
        } catch (error) {}
      }
      setIsLoading(false);
    };
    fechMaterialDidactico();
  }, []);

  const doesTypeExist = (
    documents: Array<{ tipo: string }>,
    typeValue: string
  ): boolean => {
    return documents.some((doc) =>
      doc.tipo.toLowerCase().includes(typeValue.toLowerCase())
    );
  };

  const existProgramaAnalitico = doesTypeExist(
    videosDocument,
    DocumentTypeValues.PROGRAMA_ANALITICO.type
  );
  const existCronogramas = doesTypeExist(
    videosDocument,
    DocumentTypeValues.CRONOGRAMAS.type
  );
  const existPlaneacionDidactica = doesTypeExist(
    videosDocument,
    DocumentTypeValues.PLANEACION_DIDACTICA.type
  );
  const existProyectos = doesTypeExist(
    videosDocument,
    DocumentTypeValues.PROYECTOS.type
  );
  const existEvaluacionFormativa = doesTypeExist(
    videosDocument,
    DocumentTypeValues.EVALUACION_FORMATIVA.type
  );
  const existYoutubeVideos = doesTypeExist(
    videosDocument,
    DocumentTypeValues.YOUTUBE.type
  );
  const existVideos = doesTypeExist(
    videosDocument,
    DocumentTypeValues.VIDEO.type
  );
  const existDiapositivas = doesTypeExist(
    videosDocument,
    DocumentTypeValues.DIAPOSITIVAS.type
  );
  const existWord = doesTypeExist(videosDocument, DocumentTypeValues.WORD.type);
  const existPdf = doesTypeExist(videosDocument, DocumentTypeValues.PDF.type);

  return (
    <div className=" max-h-full h-full">
      <Loading isLoading={isLoading} />

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
        selectTypeDocument.tipo === DocumentTypeValues.PDF.type && (
          <PDFViewer pdfPath={selectTypeDocument.url} />
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
      <div className="mt-16">
        {existProgramaAnalitico && (
          <WordsMaterialCarousel
            videosDocument={videosDocument}
            setSelectTypeDocument={setSelectTypeDocument}
            typeWord={DocumentTypeValues.PROGRAMA_ANALITICO.type}
            pathIcon={DocumentTypeValues.PROGRAMA_ANALITICO.icon}
            titulo={TextMaterialDidactico.textProgramaAnalitico}
          />
        )}

        {existCronogramas && (
          <WordsMaterialCarousel
            videosDocument={videosDocument}
            setSelectTypeDocument={setSelectTypeDocument}
            typeWord={DocumentTypeValues.CRONOGRAMAS.type}
            pathIcon={DocumentTypeValues.CRONOGRAMAS.icon}
            titulo={TextMaterialDidactico.textCronogramas}
          />
        )}

        {existPlaneacionDidactica && (
          <WordsMaterialCarousel
            videosDocument={videosDocument}
            setSelectTypeDocument={setSelectTypeDocument}
            typeWord={DocumentTypeValues.PLANEACION_DIDACTICA.type}
            pathIcon={DocumentTypeValues.PLANEACION_DIDACTICA.icon}
            titulo={TextMaterialDidactico.textPlaneacionDidactica}
          />
        )}

        {existProyectos && (
          <WordsMaterialCarousel
            videosDocument={videosDocument}
            setSelectTypeDocument={setSelectTypeDocument}
            typeWord={DocumentTypeValues.PROYECTOS.type}
            pathIcon={DocumentTypeValues.PROYECTOS.icon}
            titulo={TextMaterialDidactico.textProyectos}
          />
        )}

        {existEvaluacionFormativa && (
          <WordsMaterialCarousel
            videosDocument={videosDocument}
            setSelectTypeDocument={setSelectTypeDocument}
            typeWord={DocumentTypeValues.EVALUACION_FORMATIVA.type}
            pathIcon={DocumentTypeValues.EVALUACION_FORMATIVA.icon}
            titulo={TextMaterialDidactico.textEvaluacionFormativa}
          />
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
          <WordsMaterialCarousel
            videosDocument={videosDocument}
            setSelectTypeDocument={setSelectTypeDocument}
            typeWord={DocumentTypeValues.DIAPOSITIVAS.type}
            pathIcon={DocumentTypeValues.DIAPOSITIVAS.icon}
            titulo={TextMaterialDidactico.textDiapositivas}
          />
        )}

        {existWord && (
          <WordsMaterialCarousel
            videosDocument={videosDocument}
            setSelectTypeDocument={setSelectTypeDocument}
            typeWord={DocumentTypeValues.WORD.type}
            pathIcon={DocumentTypeValues.WORD.icon}
            titulo={TextMaterialDidactico.textDocuemntosWord}
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
    </div>
  );
}
