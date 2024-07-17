
import { PeriodoEvaluacion } from "@/app/types/periodos_evaluacion/TypePeriodosEvaluacion";
import { useEffect, useState } from "react";

import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import { getFechasPeriodos } from "../controller/PeriodoController";
import { EstatusFechaPeriodosType } from "@/app/estatus/EstatusType";

type Props = {
  readonly setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  readonly setNoPeriodo: React.Dispatch<React.SetStateAction<number>>;
  readonly isFetch: boolean;
  readonly setIsFetch: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function usePeriodosEvaluacion({
  setLoading,
  setNoPeriodo,
  isFetch,
  setIsFetch,
}: Props) {
  const { idUsuario } = useSidebarContext();
  const [periodos, setPeriodos] = useState<PeriodoEvaluacion[] | null>(null);

  useEffect(() => {
    const fetchPeriodos = async () => {
      setLoading(true);

      try {
        const result = await getFechasPeriodos(
          idUsuario ?? -1,
          EstatusFechaPeriodosType.OK
        );
        if (result) {
          setPeriodos(result);
        }
      } catch (err) {
      } finally {
        setLoading(false);
        setIsFetch(false);
      }
    };
    if (idUsuario !== undefined && isFetch) {
      fetchPeriodos();
    }
  }, [isFetch]);

  useEffect(() => {
    const numberNoPeriodo = findMissingPeriodo(periodos);
    setNoPeriodo(numberNoPeriodo);
  }, [periodos]);

  return { periodos };
}
export function findMissingPeriodo(
  periodos: PeriodoEvaluacion[] | null
): number {
  if (periodos === null || periodos.length === 0) {
    return 1;
  }

  const noPeriodos = periodos.map((periodo) => periodo.noPeriodo);
  const maxNoPeriodo = Math.max(...noPeriodos);
  const noPeriodoSet = new Set(noPeriodos);
  for (let i = 1; i <= maxNoPeriodo; i++) {
    if (!noPeriodoSet.has(i)) {
      return i;
    }
  }

  return maxNoPeriodo + 1;
}
