import { getApiUrl } from "../../../../../API";
import axios from "axios";
import { TypeExamenPeriodo } from "@/app/types/examen/TypeExamen";


export const getExamenesApi = async (
  idUsuario:number,
  idMateria:number,
  idGrado:number,
  idGrupo:number,
  noPeriodo:number,
 
  estatus:number,
  ): Promise<TypeExamenPeriodo[] | null> => {
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
          
          return r.data as TypeExamenPeriodo[];
        } else {
          return null;
        }
      })
      .catch((e) => {
        console.log(e)
        return null;
      });
    return response;
  };
