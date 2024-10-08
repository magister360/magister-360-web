import { TypePuntoExtraCalificacion } from "@/app/types/puntos_extra/TypePuntoExtra";
import { getApiUrl } from "../../../../../../API";
import axios from "axios";


export const getPuntosExtraGrupalApi = async (
    idUsuario: number,
    idMateria: number,
    idGrado: number,
    idGrupo: number,
    fechaInicial: string[],
    fechaFinal: string[],
    estatus: number
  ): Promise<TypePuntoExtraCalificacion[] | null> => {
    const apiUrl = getApiUrl("/api/punto_extra/get_punto_extra_grupal");
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
         
          return r.data as TypePuntoExtraCalificacion[];
        } else {
          return null;
        }
      })
      .catch((e) => {
        return null;
      });
    return response;
  };