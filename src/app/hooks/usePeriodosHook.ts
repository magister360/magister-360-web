import { ItemPeriodo } from "@/app/types/periodos/TypePeriodo";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getPeriodos } from "../controller/PeriodosController";

export const usePeriodosHook = (
  idUsuario: number | undefined,
  estatus: number,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  const [periodos, setPeriodos] = useState<ItemPeriodo[] | null>(null);

  useEffect(() => {
    const fetchPeriodos = async () => {
      try {
        setLoading(true);
        const result = await getPeriodos(idUsuario ?? -1, estatus);

        setPeriodos(result);
      } catch (err) {
        setPeriodos(null);
      } finally {
        setLoading(false);
      }
    };
    if (idUsuario !== undefined) {
      fetchPeriodos();
    }
  }, [idUsuario]);

  return { periodos };
};
