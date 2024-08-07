import { useEffect } from "react";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import { EstatusFechaPeriodosType } from "@/app/estatus/EstatusType";
import { getFechasPeriodos } from "@/app/controller/PeriodosEvaluacionController";
import { PeriodoEvaluacion } from "@/app/types/periodos_evaluacion/TypePeriodosEvaluacion";

type Props = {
  readonly setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  readonly setPeriodos: React.Dispatch<
    React.SetStateAction<PeriodoEvaluacion[] | null>
  >;
};

export default function usePeriodos({ setIsLoading, setPeriodos }: Props) {
  const { idUsuario } = useSidebarContext();

  useEffect(() => {
    const fetchPeriodos = async () => {
      setIsLoading(true);

      try {
        const result = await getFechasPeriodos(
          idUsuario ?? -1,
          EstatusFechaPeriodosType.OK
        );
        if (result) {
          setPeriodos(result);
        }
      } catch (err) {
        setPeriodos(null);
      } finally {
        setIsLoading(false);
      }
    };
    if (idUsuario !== undefined) {
      fetchPeriodos();
    }
  }, []);
}
