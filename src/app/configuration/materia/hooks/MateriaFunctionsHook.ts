import { useRouter } from "next/navigation";
import { loadSessionFromLocalStorage } from "@/app/sesions/SesionCookies";

import { useEffect } from "react";
import { getIdMateria, getStrMateria } from "../components/TableMateria";

import {
  createMateria,
  getMaterias,
  removeMateria,
  updateMateria,
} from "../controller/MateriaController";
import { TypeStatusMateria } from "@/app/utils/TypeStatusMateria";
import { ItemMateria } from "@/app/types/types";

export const MateriaFunctionsHook = (
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
  setIsLoading:Function
) => {
  const router = useRouter();

  const fetchMaterias = async () => {
    setIsLoading(true)
    const sesionLocalStorage = loadSessionFromLocalStorage();
    if (!sesionLocalStorage) {
      router.push("/login");
      return;
    }
    const userId = sesionLocalStorage?.id ?? -1;
    const materias = await getMaterias(userId, TypeStatusMateria.ALTA);
    if (materias) {
      setItems(materias);
    }
    setIsLoading(false)
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    const sesionLocalStorage = loadSessionFromLocalStorage();
    if (!sesionLocalStorage) {
      router.refresh();
      router.push("/login");
    } else {
      const userId = sesionLocalStorage?.id ?? -1;
      if (newModify) {

        console.log('data.materia '+data.materia)
        const save = await createMateria(
          userId,
          data.materia,
          TypeStatusMateria.ALTA
        );
        if (save === true) {
          fetchMaterias();
          setSuccessMessage("La materia se guardo con éxito.");
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
        const save = await updateMateria(idSelect, data.materia);
        if (save === true) {
          fetchMaterias();
          setSuccessMessage("La materia se modificó con éxito.");
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
    setIsLoading(false)
  };

  const handleClickRemove = async (items: ItemMateria[], index: number) => {

    const confirmar = window.confirm("¿Está seguro de eliminar la materia?");
    if (confirmar) {
      setIsLoading(true)
      const id = getIdMateria((items = items), index);

      const remove = await removeMateria(id, TypeStatusMateria.REMOVE);
      if (remove) {
        await fetchMaterias();
      } else {
        setErrorMessage(
          "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde."
        );
        setIsErrorModalOpen(true);
      }
      handleClickNew();
      setIsLoading(false)
    }
  };

  const handleClickUpdate = async (items: ItemMateria[], index: number) => {
    const id = getIdMateria((items = items), index);
    const value = getStrMateria((items = items), index);
    setIdSelect(id);
    setValue("materia", value);
    setNewModify(false);
  };

  const handleClickNew = () => {
    setIdSelect(-1);
    reset();
    setNewModify(true);
  };

  useEffect(() => {
    fetchMaterias();
  }, []);

  return { onSubmit, handleClickRemove, handleClickUpdate, handleClickNew };
};
