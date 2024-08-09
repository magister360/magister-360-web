import { getApiUrl } from "../../../../../API";
import axios from "axios";
import { TypeExamenCalificacion, TypeExamenPeriodo } from "@/app/types/examen/TypeExamen";


export const getExamenesApi = async (
  idUsuario:number,
  idMateria:number,
  idGrado:number,
  idGrupo:number,
  noPeriodo:number,
 
  estatus:number,
  ): Promise<TypeExamenCalificacion[] | null> => {
    const apiUrl = getApiUrl("/api/examen/get_examenes");

    const response = await axios
      .get(apiUrl, {
        params: {
          idUsuario,
          idMateria,
          idGrado,
          idGrupo,
          noPeriodo,
          estatus,
        },
      })
      .then((r) => {
        if (r.status === 200) {
          
          return r.data as TypeExamenCalificacion[];
        } else {
          return null;
        }
      })
      .catch((e) => {
        return null;
      });
    return response;
  };
