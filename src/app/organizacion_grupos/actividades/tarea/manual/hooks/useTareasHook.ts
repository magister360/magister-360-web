import { TypeTareaCalificacion } from "@/app/types/tarea/TypeTarea";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getTareasCalManual } from "../controller/AlumnoController";

export const useTareasManualHook = (
  idUsuario: number | undefined,
  estatus: number,
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idMateria: number | undefined,
  setLoading: Dispatch<SetStateAction<boolean>>,
  date: string | null,
  setIsFetchTarea: Dispatch<SetStateAction<boolean>>,
  isFetchTarea: boolean
) => {
  const [tareas, setTareas] = useState<TypeTareaCalificacion[] | null>(null);

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        setLoading(true);
        const result = await getTareasCalManual(
          idUsuario ?? -1,
          estatus,
          idGrado ?? -1,
          idGrupo ?? -1,
          idMateria ?? -1,
          date
        );

        console.log(result);

        setTareas(result);
      } catch (err) {
        setTareas(null);
      } finally {
        setLoading(false);
        setIsFetchTarea(false);
      }
    };
    if (
      idUsuario !== undefined &&
      idGrado !== undefined &&
      idGrupo !== undefined &&
      idMateria !== undefined &&
      date !== null &&
      isFetchTarea
    ) {
      fetchTareas();
    }
  }, [idUsuario, idGrado, idGrupo, idMateria, date, isFetchTarea]);

  return { tareas };
};
