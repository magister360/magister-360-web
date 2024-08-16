import { useEffect } from "react";
import { useSidebarContext } from "../sidebar/SidebarContext";
import { PeriodoEvaluacion } from "../types/periodos_evaluacion/TypePeriodosEvaluacion";
import { getFechasPeriodos } from "../controller/PeriodosEvaluacionController";
import { EstatusFechaPeriodosType } from "../estatus/EstatusType";

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
  