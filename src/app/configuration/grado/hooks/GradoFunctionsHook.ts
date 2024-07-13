import { useRouter } from "next/navigation";

import { TypeStatusGrado } from "@/app/utils/TypeStatusGrado";
import {
  createGrado,
  getGrados,
  removeGrado,
  updateGrado,
} from "../controller/GradoController";
import { getIdGrado, getStrGrado } from "../components/TablaGrado";
import { ItemGrado } from "@/app/types/types";
import { useEffect } from "react";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";

export const GradoFunctionsHook = (
  reset: Function,
  setIsSuccessModalOpen: Function,
  setIsErrorModalOpen: Function,
  setErrorMessage: Function,
  setSuccessMessage: Function,
  newModify: boolean,
  idSelect: number,
  setItems: Function,
  setIdSelect: Function,
  setValue: Function,
  setNewModify: Function,
  setIsLoading: Function
) => {
  const { idUsuario } = useSidebarContext();

  const fetchGrados = async () => {
    setIsLoading(true);

    const userId = idUsuario ?? -1;
    const grados = await getGrados(userId, TypeStatusGrado.ALTA);
    if (grados) {
      setItems(grados);
    }
    setIsLoading(false);
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    const userId = idUsuario ?? -1;
    if (newModify) {
      const save = await createGrado(userId, data.grado, TypeStatusGrado.ALTA);
      if (save === true) {
        fetchGrados();
        setSuccessMessage("El grado se guardo con éxito.");
        setIsSuccessModalOpen(true);
        reset();
      } else {
        setErrorMessage(
          "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde."
        );
        setIsErrorModalOpen(true);
        reset();
      }
    } else {
      const save = await updateGrado(idSelect, data.grado);
      if (save === true) {
        fetchGrados();
        setSuccessMessage("El grado se modificó con éxito.");
        setIsSuccessModalOpen(true);
        reset();
      } else {
        setErrorMessage(
          "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde."
        );
        setIsErrorModalOpen(true);
        reset();
      }
      handleClickNew();
    }

    setIsLoading(false);
  };

  const handleClickRemove = async (items: ItemGrado[], index: number) => {
    const confirmar = window.confirm("¿Está seguro de eliminar la grado?");
    if (confirmar) {
      setIsLoading(true);
      const id = getIdGrado(items, index);

      const remove = await removeGrado(id, TypeStatusGrado.REMOVE);
      if (remove) {
        await fetchGrados();
      } else {
        setErrorMessage(
          "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde."
        );
        setIsErrorModalOpen(true);
      }
      handleClickNew();
      setIsLoading(false);
    }
  };

  const handleClickUpdate = async (items: ItemGrado[], index: number) => {
    setIsLoading(true);
    const id = getIdGrado(items, index);
    const value = getStrGrado(items, index);
    setIdSelect(id);
    setValue("grado", value);
    setNewModify(false);
    setIsLoading(false);
  };

  const handleClickNew = () => {
    setIdSelect(-1);
    reset();
    setNewModify(true);
  };

  useEffect(() => {
    fetchGrados();
  }, []);

  return { onSubmit, handleClickRemove, handleClickUpdate, handleClickNew };
};
