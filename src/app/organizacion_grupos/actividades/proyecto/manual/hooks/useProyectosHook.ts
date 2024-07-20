import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TypeProyectoCalificacion } from "@/app/types/proyecto/TypeProyecto";
import { getProyectosCalManual } from "../controller/AlumnoController";

export const useProyectosManualHook = (
  idUsuario: number | undefined,
  estatus: number,
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idMateria: number | undefined,
  setLoading: Dispatch<SetStateAction<boolean>>,
  date: string | null,
  setIsFetchProyecto: Dispatch<SetStateAction<boolean>>,
  isFetchProyecto: boolean
) => {
  const [proyectos, setProyectos] = useState<TypeProyectoCalificacion[] | null>(
    null
  );

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        setLoading(true);
        const result = await getProyectosCalManual(
          idUsuario ?? -1,
          estatus,
          idGrado ?? -1,
          idGrupo ?? -1,
          idMateria ?? -1,
          date
        );

        console.log(result);

        setProyectos(result);
      } catch (err) {
        setProyectos(null);
      } finally {
        setLoading(false);
        setIsFetchProyecto(false);
      }
    };
    if (
      idUsuario !== undefined &&
      idGrado !== undefined &&
      idGrupo !== undefined &&
      idMateria !== undefined &&
      date !== null &&
      isFetchProyecto
    ) {
      fetchProyectos();
    }
  }, [idUsuario, idGrado, idGrupo, idMateria, date, isFetchProyecto]);

  return { proyectos };
};
