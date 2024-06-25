import { createMaterialDidactico } from "../controller/DocumentController";

export const DocuemntHook = (
  reset: Function,
  setIsSuccessModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>,
  idGrado: number,
  idGrupo: number,
  idMateria: number
) => {
  const onSubmit = async (data: any) => {
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
    } else {
      setErrorMessage(
        "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde."
      );
      setIsErrorModalOpen(true);
    }
  };

  return { onSubmit };
};
