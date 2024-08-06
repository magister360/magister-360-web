import { useEffect } from "react";
import { useSidebarContext } from "@/app/sidebar/SidebarContext";
import { getFechasFestivas } from "../controller/FechaFestivaController";
import { EstatusFechafestivaType } from "@/app/estatus/EstatusType";
import { FechaFestiva } from "@/app/types/fecha_festiva/TypeFechaFestiva";

type Props = {
  readonly setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  readonly isFetch: boolean;
  readonly setIsFetch: React.Dispatch<React.SetStateAction<boolean>>;
  readonly setFechasFestivas: React.Dispatch<
    React.SetStateAction<FechaFestiva[] | null>
  >;
};

export default function useFechaFestiva({
  setLoading,
  isFetch,
  setIsFetch,
  setFechasFestivas,
}: Props) {
  const { idUsuario } = useSidebarContext();

  useEffect(() => {
    const fetchFechasFestivas = async () => {
      setLoading(true);

      try {
        const result = await getFechasFestivas(
          idUsuario ?? -1,
          EstatusFechafestivaType.OK
        );
        
        if (result) {
         
          setFechasFestivas(result);
        }
      } catch (err) {
      } finally {
        setLoading(false);
        setIsFetch(false);
      }
    };
    if (idUsuario !== undefined && isFetch) {
      fetchFechasFestivas();
    }
  }, [isFetch]);


}
