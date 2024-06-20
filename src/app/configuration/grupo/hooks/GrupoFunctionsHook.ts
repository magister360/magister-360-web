
import { useRouter } from "next/navigation";
import { loadSessionFromLocalStorage } from "@/app/sesions/SesionCookies";
import {
  createGrupo,
  getGrupos,
  removeGrupo,
  updateGrupo,
} from "../controller/GrupoController";

import {  ItemGrupo } from "@/app/types/types";
import { useEffect } from "react";
import { getIdGrupo, getStrGrupo } from "../components/TableGrupo";
import { TypeStatusGrupo } from "@/app/utils/TypeStatusGrupo";

export const GrupoFunctionsHook = (
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
  setNewModify: Function
) => {
  const router = useRouter();

  const fetchGrupos = async () => {
    const sesionLocalStorage = loadSessionFromLocalStorage();
    if (!sesionLocalStorage) {
      router.push("/login");
      return;
    }
    const userId = sesionLocalStorage?.id ?? -1;
    const grupos = await getGrupos(userId, TypeStatusGrupo.ALTA);
    if (grupos) {
      setItems(grupos);
    }
  };

  const onSubmit = async (data: any) => {
    const sesionLocalStorage = loadSessionFromLocalStorage();
    if (!sesionLocalStorage) {
      router.refresh();
      router.push("/login");
    } else {
      const userId = sesionLocalStorage?.id ?? -1;
      if (newModify) {
        const save = await createGrupo(
          userId,
          data.grupo,
          TypeStatusGrupo.ALTA
        );
        if (save === true) {
            fetchGrupos();
          setSuccessMessage("El grupo se guardo con éxito.");
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
        const save = await updateGrupo(idSelect, data.grupo);
        if (save === true) {
            fetchGrupos();
          setSuccessMessage("El grupo se modificó con éxito.");
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
    }
  };

  const handleClickRemove = async (items: ItemGrupo[], index: number) => {
    const confirmar = window.confirm("¿Está seguro de eliminar la grupo?");
    if (confirmar) {
      const id = getIdGrupo((items = items), index);

      const remove = await removeGrupo(id, TypeStatusGrupo.REMOVE);
      if (remove) {
        await fetchGrupos();
      } else {
        setErrorMessage(
          "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde."
        );
        setIsErrorModalOpen(true);
      }
      handleClickNew();
    }
  };

  const handleClickUpdate = async (items: ItemGrupo[], index: number) => {
    const id = getIdGrupo((items = items), index);
    const value = getStrGrupo((items = items), index);
    setIdSelect(id);
    setValue("grupo", value);
    setNewModify(false);
  };

  const handleClickNew = () => {
    setIdSelect(-1);
    reset();
    setNewModify(true);
  };

  useEffect(() => {
    fetchGrupos();
  }, []);

  return { onSubmit, handleClickRemove, handleClickUpdate, handleClickNew };
};
