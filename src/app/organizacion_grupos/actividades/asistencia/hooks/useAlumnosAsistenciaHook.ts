import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getAlumnos } from "../controller/AlumnosController";
import {
  AStudenAsistenciaType,
  StudenAsistenciaType,
} from "@/app/types/asistencia/TypeAsistencia";
import { AsistenciaType } from "../types";

export const useAlumnosAsistenciaHook = (
  idUsuario: number | undefined,
  estatus: number,
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idMateria: number | undefined,
  setLoading: Dispatch<SetStateAction<boolean>>,
  orderStudents: string | undefined,
  currentIndex:number
) => {
  const [alumnos, setAlumnos] = useState<StudenAsistenciaType[] | null>(null);

  const [alumnosA, setAlumnosA] = useState<AStudenAsistenciaType[] | undefined>(
    undefined
  );

  const [alumnoSelect, setAlumnoSelect] = useState<
    AStudenAsistenciaType | undefined
  >(undefined);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        setLoading(true);
        const result = await getAlumnos(
          idUsuario,
          estatus,
          idGrado,
          idGrupo,
          idMateria,
          orderStudents
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
      idMateria !== undefined&&
      orderStudents!== undefined
    ) {
      fetchAlumnos();
    }
  }, [idUsuario, idGrado, idGrupo, idMateria, orderStudents]);

  useEffect(() => {
    if (alumnos) {
      const alumnosWithAsistencia: AStudenAsistenciaType[] = alumnos.map(
        (alumno) => ({
          ...alumno,
          asistencia: AsistenciaType.A,
        })
      );
      setAlumnosA(alumnosWithAsistencia);
    }
  }, [alumnos]);

  useEffect(() => {
    if (alumnosA && alumnosA.length > 0) {
    
      setAlumnoSelect(alumnosA[currentIndex]);
    }
  }, [alumnosA]);

  return { alumnosA, alumnoSelect, setAlumnosA, setAlumnoSelect };
};
