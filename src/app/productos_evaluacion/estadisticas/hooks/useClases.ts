import { useEffect } from "react";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import { InicioFinClases } from "@/app/types/inicio_fin_clases/TypeInicioFinClases";
import { getFechaInicioFinClases } from "../controller/ClasesController";

type Props = {
  readonly setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  readonly setInicioFinClases: React.Dispatch<
    React.SetStateAction<InicioFinClases | null>
  >;
};

export default function useClases({
  setIsLoading,

  setInicioFinClases,
}: Props) {
  const { idUsuario } = useSidebarContext();

  useEffect(() => {
    const fetchClases = async () => {
      setIsLoading(true);

      try {
        const result = await getFechaInicioFinClases(idUsuario ?? -1);
        if (result) {
            //console.log(result)
          setInicioFinClases(result);
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };
    if (idUsuario !== undefined) {
      fetchClases();
    }
  }, []);
}
