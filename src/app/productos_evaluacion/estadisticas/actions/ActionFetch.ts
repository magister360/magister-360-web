import { EstatusParticipacionType } from "@/app/estatus/EstatusType";
import { countParticipaciones, getParticipaciones } from "../controller/ParticipacionController";

const actionFetch = async (
  idUsuario: number | undefined,
  idMateria: number | undefined,
  idGrado: number | undefined,
  idGrupo: number | undefined,
  fechaInicial: string | undefined,
  fechaFinal: string | undefined,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true);

  const result =await getParticipaciones(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
    EstatusParticipacionType.OK
  );
  const countParticipacion=await countParticipaciones(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    fechaInicial,
    fechaFinal,
    EstatusParticipacionType.OK
  );
  console.log(result)
  console.log(countParticipacion)

  setIsLoading(false);
};

export default actionFetch;