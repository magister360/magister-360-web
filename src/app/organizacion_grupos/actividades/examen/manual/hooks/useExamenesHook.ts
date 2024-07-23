import { TypeExamenCalificacion } from "@/app/types/examen/TypeExamen";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getExamenCalManual } from "../controller/AlumnoController";

export const useExamnesManualHook = (
  idUsuario: number | undefined,
  estatus: number,
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idMateria: number | undefined,
  setLoading: Dispatch<SetStateAction<boolean>>,
  noPeriodo: string | undefined,
  setIsFetchExamen: Dispatch<SetStateAction<boolean>>,
  isFetchExamen: boolean
) => {
  const [examenes, setExamenes] = useState<TypeExamenCalificacion[] | null>(
    null
  );

  useEffect(() => {
    const fetchExamenes = async () => {
      try {
        setLoading(true);
        const result = await getExamenCalManual(
          idUsuario ?? -1,
          estatus,
          idGrado ?? -1,
          idGrupo ?? -1,
          idMateria ?? -1,
          noPeriodo
        );
     
        setExamenes(result);
      } catch (err) {
        setExamenes(null);
      } finally {
        setLoading(false);
        setIsFetchExamen(false);
      }
    };
    if (
      idUsuario !== null &&
      idUsuario !== undefined &&
      idGrado !== null &&
      idGrado !== undefined &&
      idGrupo !== null &&
      idGrupo !== undefined &&
      idMateria !== null &&
      idMateria !== undefined &&
      noPeriodo !== undefined &&
      noPeriodo !== null &&
      isFetchExamen
    ) {
      fetchExamenes();
    }
  }, [idUsuario, idGrado, idGrupo, idMateria, noPeriodo, isFetchExamen]);

  return { examenes };
};
