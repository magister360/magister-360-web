import { useEffect } from "react";
import { getParticipaciones } from "../controller/ParticipacionController";
import { EstatusParticipacionType } from "@/app/estatus/EstatusType";


const useParticipacion = (

    idUsuario: number | undefined,
    idMateria: number | undefined,
    idGrado: number | undefined,
    idGrupo: number | undefined,
    fechaInicial: string|undefined,
    fechaFinal: string|undefined,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
   
  
) => {

  useEffect(() => {
    setIsLoading(true)
    const fetchParticipacion = async () => {

      const result= getParticipaciones (
        idUsuario,
        idMateria,
        idGrado,
        idGrupo,
        fechaInicial,
        fechaFinal,
        EstatusParticipacionType.OK
      )
    
      setIsLoading(false)
    }

    if (
      idGrado !== undefined &&
      idGrupo !== undefined &&
      idMateria !== undefined &&
      idUsuario !== undefined&&
      fechaInicial !== undefined &&
      fechaFinal !== undefined
    ) {
      fetchParticipacion();
    }
  }, [idGrado, idGrupo, idMateria,fechaInicial,fechaFinal]);

};
export default useParticipacion;
