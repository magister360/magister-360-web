import { StudentType } from "@/app/types/types";
import { TypeStatusAlumno } from "@/app/utils/TypeStatusAlumno";
import { ChangeEvent, useEffect } from "react";
import { getMaxNoListaAlumno } from "../controller/MaxNoListaController";
import { loadSessionFromLocalStorage } from "@/app/sesions/SesionCookies";

export const NewModifyStudentHook = (
  setValue: Function,
  reset: Function,
  studentSelect: StudentType | undefined,
  isOpen: boolean,
  setImageSrcPhoto: Function,
  IMAGE_DEFECTO: string,
  idGrado: number,
  idGrupo: number
) => {
 

  useEffect(() => {
    if (isOpen) {
      reset();
      setImageSrcPhoto(IMAGE_DEFECTO);
      if (!studentSelect || studentSelect === undefined) {
        (async () => {
          const sesionLocalStorage = loadSessionFromLocalStorage();

          const userId = sesionLocalStorage?.id ?? -1;
          const maxNoLista = await getMaxNoListaAlumno(
            userId,
            TypeStatusAlumno.ALTA,
            idGrado,
            idGrupo
          );
          return maxNoLista;
        })().then((result) => {
      
          setValue("no_lista", result);
          setValue("nombre", "");
          setValue("apellidoPaterno", "");
          setValue("apellidoMaterno", "");
          setValue("estatus", TypeStatusAlumno.ALTA);
        });
      }
    }
  }, [isOpen, reset, studentSelect, setValue]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrcPhoto(imageUrl);
    }
  };

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  const getStatusText = (status: TypeStatusAlumno): string => {
   // console.log('status '+status)
    switch (status) {
      case TypeStatusAlumno.ALTA:
        return "Alta";
      case TypeStatusAlumno.BAJA:
        return "Baja";
      case TypeStatusAlumno.CAMBIO:
        return "Cambio";
      default:
        return "";
    }
  };
  useEffect(() => {
    if (studentSelect && studentSelect != undefined) {
      setValue("no_lista", studentSelect.noLista);
      setValue("nombre", studentSelect.nombre);
      setValue("apellidoPaterno", studentSelect.apellidoPaterno);
      setValue("apellidoMaterno", studentSelect.apellidoMaterno);
      setValue("estatus", studentSelect.estatus || TypeStatusAlumno.ALTA);
     
    }
  }, [studentSelect, setValue]);

  return { getStatusText, handleImageChange, onSubmit };
};
