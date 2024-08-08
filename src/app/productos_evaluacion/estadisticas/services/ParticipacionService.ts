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
  console.log(fechaInicial, fechaFinal)
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
          console.log(r.data)
          return r.data as TypeParticipacionFecha[];
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

  export const countParticipacionesApi = async (
    idUsuario:number,
    idMateria:number,
    idGrado:number,
    idGrupo:number,
    fechaInicial:string,
    fechaFinal:string,
    estatus:number,
    ): Promise<number> => {
      const apiUrl = getApiUrl("/api/participacion/count_participacion");
   
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
           
            return r.data ;
          } else {
            return 0;
          }
        })
        .catch((e) => {
          console.log(e)
          return 0;
        });
      return response;
    };