import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getParticipacionesCalManual } from "../controller/AlumnoController";
import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";

export const useParticipacionesManualHook = (
  idUsuario: number | undefined,
  estatus: number,
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idMateria: number | undefined,
  setLoading: Dispatch<SetStateAction<boolean>>,
  date: string | null,
  setIsFetchParticipacion: Dispatch<SetStateAction<boolean>>,
  isFetchParticipacion: boolean
) => {
  const [participaciones, setParticipaciones] = useState<
    TypeParticipacionCalificacion[] | null
  >(null);

  useEffect(() => {
    const fetchParticipaciones = async () => {
      try {
        setLoading(true);
        const result = await getParticipacionesCalManual(
          idUsuario ?? -1,
          estatus,
          idGrado ?? -1,
          idGrupo ?? -1,
          idMateria ?? -1,
          date
        );

        console.log(result)

        setParticipaciones(result);
      } catch (err) {
        setParticipaciones(null);
      } finally {
        setLoading(false);
        setIsFetchParticipacion(false);
      }
    };
    if (
      idUsuario !== undefined &&
      idGrado !== undefined &&
      idGrupo !== undefined &&
      idMateria !== undefined &&
      date !== null &&
      isFetchParticipacion
    ) {
      fetchParticipaciones();
    }
  }, [idUsuario, idGrado, idGrupo, idMateria, date, isFetchParticipacion]);

  return { participaciones };
};
