import { useEffect } from "react";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import { Cronograma } from "@/app/types/cronograma/TypeCronograma";
import { getCronograma } from "../controller/CronogramaCotroller";

type Props = {
  readonly setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  readonly isFetch: boolean;
  readonly setIsFetch: React.Dispatch<React.SetStateAction<boolean>>;
  readonly setCronogramas: React.Dispatch<
    React.SetStateAction<Cronograma[] | null>
  >;
};

export default function useCronogramas({
  setLoading,
  isFetch,
  setIsFetch,
  setCronogramas,
}: Props) {
  const { idUsuario, idGrado, idGrupo, idMateria } = useSidebarContext();

  useEffect(() => {
    const fetchCronograma = async () => {
      setLoading(true);

      try {
        const result = await getCronograma(
          idUsuario,
          idGrado,
          idGrupo,
          idMateria
        );
        if (result) {
          console.log(result);
          setCronogramas(result);
        }
      } catch (err) {
      } finally {
        setLoading(false);
        setIsFetch(false);
      }
    };
    if (
      idUsuario !== undefined &&
      idGrado !== undefined &&
      idGrupo !== undefined &&
      idMateria !== undefined &&
      isFetch
    ) {
      fetchCronograma();
    }
  }, [isFetch]);
}
