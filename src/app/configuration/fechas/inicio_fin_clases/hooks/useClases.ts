import { useEffect } from "react";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import { getFechaInicioFinClases } from "../controller/ClasesController";
import { InicioFinClases } from "@/app/types/inicio_fin_clases/TypeInicioFinClases";

type Props = {
  readonly setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  readonly isFetch: boolean;
  readonly setIsFetch: React.Dispatch<React.SetStateAction<boolean>>;
  readonly setInicioFinClases: React.Dispatch<
    React.SetStateAction<InicioFinClases | null>
  >;
  readonly setId: React.Dispatch<React.SetStateAction<number|undefined>>;
};

export default function useClases({
  setLoading,
  isFetch,
  setIsFetch,
  setInicioFinClases,
  setId
}: Props) {
  const { idUsuario } = useSidebarContext();

  useEffect(() => {
    const fetchClases = async () => {
      setLoading(true);

      try {
        const result = await getFechaInicioFinClases(idUsuario ?? -1);
        if (result) {
          
          setInicioFinClases(result);
          setId(result.id);
        }
      } catch (err) {
      } finally {
        setLoading(false);
        setIsFetch(false);
      }
    };
    if (idUsuario !== undefined && isFetch) {
        fetchClases();
    }
  }, [isFetch]);
}
