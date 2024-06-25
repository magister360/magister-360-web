
import { DocumentTypeValues } from "@/app/utils/DocumentTypeValues";
import { getYouTubeVideoId } from "@/app/utils/URLYouTube";
import Image from "next/image";

interface PreviaDocumentCarouselProps {
  urlYoutube: string;
  title: string;
  descripcion: string;
  type: string;
}


const getYouTubeThumbnail = (url: string) => {
  if (url !== undefined && url !== "") {
    url=url.trim()
    const videoId = getYouTubeVideoId(url);

    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  } else {
    return DocumentTypeValues.YOUTUBE.icon;
  }
};

const getPathDocument = (type: string, urlYoutube: string): string => {
  if (type === DocumentTypeValues.YOUTUBE.type) {
    return getYouTubeThumbnail(urlYoutube);
  } else if (type === DocumentTypeValues.VIDEO.type) {
    return DocumentTypeValues.VIDEO.icon;
  } else if (type === DocumentTypeValues.DIAPOSITIVAS.type) {
    return DocumentTypeValues.DIAPOSITIVAS.icon;
  } else if (type === DocumentTypeValues.PDF.type) {
    return DocumentTypeValues.PDF.icon;
  } else if (type === DocumentTypeValues.WORD.type) {
    return DocumentTypeValues.WORD.icon;
  }
  return DocumentTypeValues.DOCUMENT.icon;
};

export const PreviaDocumentCarousel: React.FC<PreviaDocumentCarouselProps> = ({
  urlYoutube,
  title,
  descripcion,
  type,
}) => {
  const url = getPathDocument(type, urlYoutube);

  return (
    <>
      <label
        htmlFor="lbl_previa"
        className="block ml-2 mb-2 text-sm font-medium 
                    dark:text-gray-200 text-gray-200 "
      >
        Previa
      </label>

      <div key="1" className="w-64 h-96 flex-shrink-0 p-2 flex  ">
        <div
          className="rounded-lg overflow-hidden  shadow-md
                   bg-white dark:bg-[#ddeff0] flex flex-col flex-grow 
                   transition-transform duration-300  hover:scale-110 hover:z-20 hover:rounded-2xl"
        >
          <div className="h-48 min-h-48 overflow-hidden">
            <Image
              src={url}
              alt=""
              width={320}
              height={180}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow min-h-50 h-50">
            <h3 className="text-lg font-semibold mb-2 dark:text-gray-600 overflow-hidden max-h-20">
              {title}
            </h3>
            <p className="text-sm text-gray-600 overflow-hidden max-h-14">
              {descripcion}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
