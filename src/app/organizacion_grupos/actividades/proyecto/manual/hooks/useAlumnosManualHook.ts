import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getAlumnosManual } from "../controller/AlumnoController";
import { StudentProyectoType } from "@/app/types/proyecto/TypeProyecto";


export const useAlumnosManualHook = (
  idUsuario: number | undefined,
  estatus: number,
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idMateria: number | undefined,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  const [alumnos, setAlumnos] = useState<StudentProyectoType[] | null>(
    null
  );

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        setLoading(true);
        const result = await getAlumnosManual(
          idUsuario ?? -1,
          estatus,
          idGrado ?? -1,
          idGrupo ?? -1,
          idMateria ?? -1
        );

        setAlumnos(result);
      } catch (err) {
        setAlumnos(null);
      } finally {
        setLoading(false);
      }
    };
    if (
      idUsuario !== undefined &&
      idGrado !== undefined &&
      idGrupo !== undefined &&
      idMateria !== undefined
    ) {
      fetchAlumnos();
    }
  }, [idUsuario, idGrado, idGrupo, idMateria]);

  return { alumnos };
};
