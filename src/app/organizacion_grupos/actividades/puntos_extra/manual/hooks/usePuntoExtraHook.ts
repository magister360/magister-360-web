import { TypePuntoExtraCalificacion } from "@/app/types/puntos_extra/TypePuntoExtra";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getPuntosExtrasCalManual } from "../controller/AlumnoController";

export const usePuntoExtraManualHook = (
  idUsuario: number | undefined,
  estatus: number,
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idMateria: number | undefined,
  setLoading: Dispatch<SetStateAction<boolean>>,
  date: string | null,
  setIsFetchPuntoExtra: Dispatch<SetStateAction<boolean>>,
  isFetchPuntoExtra: boolean
) => {
  const [puntosExtras, setPuntosExtras] = useState<
    TypePuntoExtraCalificacion[] | null
  >(null);

  useEffect(() => {
    const fetchPuntosExtras = async () => {
      try {
        setLoading(true);
        const result = await getPuntosExtrasCalManual(
          idUsuario ?? -1,
          estatus,
          idGrado ?? -1,
          idGrupo ?? -1,
          idMateria ?? -1,
          date
        );
       

        setPuntosExtras(result);
      } catch (err) {
        setPuntosExtras(null);
      } finally {
        setLoading(false);
        setIsFetchPuntoExtra(false);
      }
    };
    if (
      idUsuario !== undefined &&
      idGrado !== undefined &&
      idGrupo !== undefined &&
      idMateria !== undefined &&
      date !== null &&
      isFetchPuntoExtra
    ) {
      fetchPuntosExtras();
    }
  }, [idUsuario, idGrado, idGrupo, idMateria, date, isFetchPuntoExtra]);

  return { puntosExtras };
};
