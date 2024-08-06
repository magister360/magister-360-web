import { TypeParticipacionFecha } from "@/app/types/participacion/TypeParticipacion";
import { getApiUrl } from "../../../../../API";
import axios from "axios";

export const getParticipacionesApi = async (
  idUsuario:number,
  idMateria:number,
  idGrado:number,
  idGrupo:number,
  fechaInicial:string,
  fechaFinal:string,
  estatus:number,
  ): Promise<TypeParticipacionFecha[] | null> => {
    const apiUrl = getApiUrl("/api/participacion/get_participaciones");
  
    const response = await axios
      .get(apiUrl, {
        params: {
          idUsuario,
          idMateria,
          idGrado,
          idGrupo,
          fechaInicial,
          fechaFinal,
          estatus,
        },
      })
      .then((r) => {
        if (r.status === 200) {
          return r.data as TypeParticipacionFecha[];
        } else {
          return null;
        }
      })
      .catch((e) => {
        return null;
      });
    return response;
  };