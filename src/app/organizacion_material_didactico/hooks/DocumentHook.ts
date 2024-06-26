import { MaterialDidacticoType } from "@/app/types/types";
import {
  createMaterialDidactico,
  deleteMaterialDidactico,
  updateMaterialDidactico,
} from "../controller/DocumentController";

export const DocumentHook = (
  reset: () => void,
  setIsSuccessModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>,
  idGrado: number,
  idGrupo: number,
  idMateria: number,
  selectMaterialDidacticoType: MaterialDidacticoType | null,
  fetchMaterialDidacticos: () => Promise<void>
) => {
  const onSubmit = async (data: any) => {
    if (selectMaterialDidacticoType === null) {
      const save = await createMaterialDidactico(
        data.tipo_document,
        data.url_youtube,
        data.titulo,
        data.descripcion,
        "",
        "",
        idGrado,
        idGrupo,
        idMateria
      );

      if (save === true) {
        reset();
        setSuccessMessage("El material didáctico se guardo con éxito.");
        setIsSuccessModalOpen(true);
        fetchMaterialDidacticos();
      } else {
        setErrorMessage(
          "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde."
        );
        setIsErrorModalOpen(true);
      }
    } else {
      const save = await updateMaterialDidactico(
        selectMaterialDidacticoType.id,
        data.tipo_document,
        data.url_youtube,
        data.titulo,
        data.descripcion,
        "",
        ""
      );

      if (save === true) {
        reset();
        setSuccessMessage("El material didáctico se modifico con éxito.");
        setIsSuccessModalOpen(true);
        fetchMaterialDidacticos();
      } else {
        setErrorMessage(
          "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde."
        );
        setIsErrorModalOpen(true);
      }
    }
  };


  return { onSubmit };
};
