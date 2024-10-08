import {
  DocumentTypeValues,
  getDocuemntTypeValues,
} from "@/app/utils/DocumentTypeValues";
import OptionsValuesDocuments from "./OptionValuesDocuments";
import ErrorMessageInput from "@/app/components/ErrorMessageInput";
import { FieldErrors } from "react-hook-form";
import { PreviaDocumentCarousel } from "./PreviaDocumentCarousel";
import Image from "next/image";
import { MaterialDidacticoType } from "@/app/types/types";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { addUrlYouTubeVideoId } from "@/app/utils/URLYouTube";

export const ValuesDataString = {
  TIPO_DOCUMENT: { str: "tipo_document" },
  URL_YOUTUBE: { str: "url_youtube" },
  TITULO: { str: "titulo" },
  DESCRIPCION: { str: "descripcion" },
} as const;

interface NewModifyMaterialDidacticoProps {
  setValue: Function;
  isOpen: boolean;
  onClose: () => void;
  register: Function;
  watch: Function;
  errors: FieldErrors;
  handleSubmit: Function;
  onSubmit: Function;
  successMessage: string;
  errorMessage: string;
  reset: Function;
  selectMaterialDidacticoType: MaterialDidacticoType | null;
}

export const NewModifyMaterialDidactico: React.FC<
  NewModifyMaterialDidacticoProps
> = ({
  setValue,
  isOpen,
  onClose,
  register,
  watch,
  errors,
  handleSubmit,
  onSubmit,
  successMessage,
  errorMessage,
  reset,
  selectMaterialDidacticoType,
}) => {
  useEffect(() => {
    if (
      selectMaterialDidacticoType &&
      selectMaterialDidacticoType != undefined
    ) {
      setValue(
        ValuesDataString.TIPO_DOCUMENT.str,
        selectMaterialDidacticoType.tipo
      );
      const url_youtube = addUrlYouTubeVideoId(selectMaterialDidacticoType.url);
      setValue(ValuesDataString.URL_YOUTUBE.str, url_youtube);
      setValue(ValuesDataString.TITULO.str, selectMaterialDidacticoType.titulo);
      setValue(
        ValuesDataString.DESCRIPCION.str,
        selectMaterialDidacticoType.descripcion
      );
    }
  }, [selectMaterialDidacticoType, setValue]);

  const values = getDocuemntTypeValues();
  const handleClose = () => {
    onClose();
    reset();
  };
  if (isOpen && (successMessage !== "" || errorMessage !== "")) {
    handleClose();
  }
  return (
    <>
      <form className=" " onSubmit={handleSubmit(onSubmit)} method="POST">
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-800 dark:bg-opacity-90 bg-opacity-80 
           transition-opacity duration-300 overflow-y-auto pt-10 ${
             isOpen ? "visible" : "hidden"
           }`}
        >
          <div className="flex space-x-4 max-h-[90vh]">
            <div className="flex-1 mt-4 rounded-lg shadow sm:max-w-md dark:bg-[#18181B] bg-[#ffffff] p-5 relative">
              <div className="flex justify-end">
                <Image
                  className=" absolute right-0 m-4 cursor-pointer dark:filter dark:invert opacity-40 filter-none"
                  src="/close_32.png"
                  alt="close"
                  width={32}
                  height={32}
                  priority
                  onClick={handleClose}
                />
              </div>
              <h3 className="pt-2 pb-2  text-gray-700 dark:text-gray-200 font-bold text-xl ">
                Material didáctico
              </h3>
              <label
                htmlFor="lbl-tipo-document-video"
                className="block mb-2 text-sm font-medium text-gray-900
                    dark:text-white"
              >
                Tipo de documento o video
              </label>
              <select
                id="select-tipo-document-video"
                className="block w-full p-2 mb-2 text-sm text-gray-900 
                         border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
                        focus:border-blue-500 dark:bg-[#1a2c32] dark:border-gray-600
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                        dark:focus:border-blue-500 "
                {...register(ValuesDataString.TIPO_DOCUMENT.str)}
              >
                <OptionsValuesDocuments values={values} />
              </select>

              {watch(ValuesDataString.TIPO_DOCUMENT.str) ===
                DocumentTypeValues.YOUTUBE.type && (
                <>
                  <label
                    htmlFor="lbl_url-video-youtube"
                    className="block mb-2 text-sm font-medium text-gray-900
                    dark:text-white"
                  >
                    Url del video de Youtube
                  </label>
                  <input
                    type="text"
                    id="text-url-video-youtube"
                    className="bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                                 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-blue-500 
                                  dark:focus:border-blue-500 mb-2"
                    placeholder=""
                    {...register(ValuesDataString.URL_YOUTUBE.str, {
                      required: "La url es requerida",
                      maxLength: {
                        value: 100,
                        message: "La url no puede tener más de 100 caracteres",
                      },
                    })}
                  />
                </>
              )}

              <label
                htmlFor="lbl_titulo"
                className="block mb-2 text-sm font-medium text-gray-900
                    dark:text-white"
              >
                Titulo
              </label>
              <input
                type="text"
                id="text-titulo"
                className="bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                                 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-blue-500 
                                  dark:focus:border-blue-500 mb-2"
                placeholder=""
                {...register(ValuesDataString.TITULO.str, {
                  required: "Titulo es requerido",
                  maxLength: {
                    value: 60,
                    message: "El titulo no puede tener más de 60 caracteres",
                  },
                })}
              />
              {errors.titulo && (
                <ErrorMessageInput message={errors.titulo.message + ""} />
              )}

              <label
                htmlFor="lbl_descripcion"
                className="block mb-2 text-sm font-medium text-gray-900
                    dark:text-white"
              >
                Descripción
              </label>
              <textarea
                className="bg-gray-50 border border-gray-300 
                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                         focus:border-primary-600 block w-full p-2.5 dark:bg-[#1a2c32]
                        dark:border-gray-600 dark:placeholder-gray-400
                        dark:text-white dark:focus:ring-blue-500 
                        dark:focus:border-blue-500 mb-2"
                rows={4}
                cols={50}
                placeholder="Escribe tu descripción aquí..."
                maxLength={500}
                {...register(ValuesDataString.DESCRIPCION.str, {
                  maxLength: {
                    value: 500,
                    message:
                      "La descripción no puede tener más de 500 caracteres",
                  },
                })}
              ></textarea>
              {errors.descripcion && (
                <ErrorMessageInput message={errors.descripcion.message + ""} />
              )}
              <div>
                {watch("tipo_document") !== DocumentTypeValues.YOUTUBE.type && (
                  <>
                    <label
                      htmlFor="lbl_miniatura"
                      className="block mb-2 text-sm font-medium text-gray-900
                    dark:text-white"
                    >
                      Miniatura
                    </label>
                    <input
                      className="w-full bg-gray-50 border border-gray-300 
                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                           focus:border-primary-600 block  p-2.5 dark:bg-[#1a2c32]
                           dark:border-gray-600 dark:placeholder-gray-400
                           dark:text-white dark:focus:ring-blue-500 
                           dark:focus:border-blue-500  mt-2"
                      id="fileInput"
                      type="file"
                      accept=".jpg .png"
                    />
                  </>
                )}
                <button
                  type="submit"
                  className="w-full text-white bg-[#438e96] hover:bg-[#3b757f] 
                             focus:ring-4 focus:outline-none focus:ring-blue-300 
                             font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                            dark:bg-[#438e96] dark:hover:bg-[#3b757f] 
                            dark:focus:ring-blue-800 mt-3  "
                >
                  Guardar
                </button>
              </div>
            </div>

            <div
              className="flex-1 mt-4 rounded-lg shadow  
                        sm:max-w-md    p-5"
            >
              <PreviaDocumentCarousel
                title={watch(ValuesDataString.TITULO.str)}
                descripcion={watch(ValuesDataString.DESCRIPCION.str)}
                urlYoutube={watch(ValuesDataString.URL_YOUTUBE.str)}
                type={watch(ValuesDataString.TIPO_DOCUMENT.str)}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
