import { useEffect, useState } from "react";
import { getCronogramas } from "../controller/CronogramaController";
import { EstatusCronogramaType } from "@/app/estatus/EstatusType";
import { Cronograma } from "@/app/types/cronograma/TypeCronograma";

const useCronograma = (
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idMateria: number | undefined,
  idUsuario: number | undefined
) => {
  const [cronogramas, setCronogramas] = useState<Cronograma[] | null>(null);
  useEffect(() => {
    const fetchCronogramas = async () => {
      const result =await getCronogramas(
        idUsuario,
        idMateria,
        idGrado,
        idGrupo,
        EstatusCronogramaType.OK
      );
      console.log(result)
      setCronogramas(result);
    };

    if (
      idGrado !== undefined &&
      idGrupo !== undefined &&
      idMateria !== undefined &&
      idUsuario !== undefined
    ) {
      fetchCronogramas();
    }
  }, [idGrado, idGrupo, idMateria]);

  return cronogramas;
};
export default useCronograma;
