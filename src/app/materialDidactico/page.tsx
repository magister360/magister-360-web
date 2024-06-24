"use client";
import { useRef, useState } from "react";
import VideosYouTubeCarousel, {
  SlideItem,
} from "./components/VideosYouTubeCarousel";
import YouTubePlayer from "./components/YouTubePlayer";
import VideosCarousel from "./components/VideosCarousel";
import DiapositivasCarousel from "./components/DiapositivasCarousel";
import DocumentsPdfCarousel from "./components/DocumentsPdfCarousel";
import DocumentsWordCarousel from "./components/DocumentsWordCarousel";

export default function MaterialDidactico() {
  const scrollableRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const slides: SlideItem[] = [
    {
      type: "youtube",
      urlId: "Bd7XboIfsU4",
      title: "Números de varios dígitos",
      description: "Problemas verbales de comparar números de varios dígitos",
    },

    {
      type: "youtube",
      urlId: "ViFfLZ21OQU",
      title: "Operaciones con fracciones",
      description: "",
    },
    {
      type: "youtube",
      urlId: "RlUZv0MoVWk",
      title: "Operaciones con números de varios dígitos",
      description:
        "Multiplica 3 y 4 dígitos por 1 dígito con la propiedad distributiva",
    },
    {
      type: "youtube",
      urlId: "RlUZv0MoVWk",
      title: "",
      description: "",
    },
    {
      type: "youtube",
      urlId: "BbA5dpS4CcI",
      title: "",
      description: "",
    },
    {
      type: "youtube",
      urlId: "Bd7XboIfsU4",
      title: "",
      description: "",
    },
  ];

  const [selectTypeDocument, setSelectTypeDocument] = useState({
    urlId: "Bd7XboIfsU4",
    type: "youtube",
    title: "Operaciones con números de varios dígitos",
    description:
      "San Pablo Guelatao, Intendencia de Oaxaca; 21 de marzo de 1806-Ciudad de México, 18 de julio de 1872), conocido como El Benemérito de las Américas,2​ fue un jurista y político mexicano de origen indígena de la etnia zapoteca que se desempeñó como presidente de México en varias ocasiones, desde el 21 de enero de 1858 hasta el 18 de julio de 1872.3​ Es célebre su frase: «Entre los individuos, como entre las naciones, el respeto al derecho ajeno es la paz».4​.",
  });
  return (
    <div className=" max-h-full h-full">
      {selectTypeDocument.urlId !== "" &&
        selectTypeDocument.type === "youtube" && (
          <YouTubePlayer videoId={selectTypeDocument.urlId} />
        )}
      {selectTypeDocument.urlId !== "" &&
        selectTypeDocument.type !== "" &&
        selectTypeDocument.title !== "" && (
          <div className="mb-4 ml-80">
            <h3 className="mt-4  block text-gray-700 dark:text-gray-200 font-bold text-xl ">
              {selectTypeDocument.title}
            </h3>
            <p className="text-gray-500"> {selectTypeDocument.description}</p>
          </div>
        )}

      <VideosYouTubeCarousel
        slides={slides}
        setSelectTypeDocument={setSelectTypeDocument}
        scrollToTop={scrollToTop}
      />
      <VideosCarousel
        slides={slides}
        setSelectTypeDocument={setSelectTypeDocument}
        scrollToTop={scrollToTop}
      />

      <DiapositivasCarousel
        slides={slides}
        setSelectTypeDocument={setSelectTypeDocument}
        scrollToTop={scrollToTop}
      />
      <DocumentsPdfCarousel
        slides={slides}
        setSelectTypeDocument={setSelectTypeDocument}
        scrollToTop={scrollToTop}
      />
       <DocumentsWordCarousel
        slides={slides}
        setSelectTypeDocument={setSelectTypeDocument}
        scrollToTop={scrollToTop}
      />
    </div>
  );
}
