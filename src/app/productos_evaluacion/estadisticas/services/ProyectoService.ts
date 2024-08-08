import { TypeProyectoFecha } from "@/app/types/proyecto/TypeProyecto";
import { getApiUrl } from "../../../../../API";
import axios from "axios";


export const getProyectosApi = async (
  idUsuario:number,
  idMateria:number,
  idGrado:number,
  idGrupo:number,
  fechaInicial:string,
  fechaFinal:string,
  estatus:number,
  ): Promise<TypeProyectoFecha[] | null> => {
    const apiUrl = getApiUrl("/api/proyecto/get_proyectos");

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
          
          return r.data as TypeProyectoFecha[];
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

  export const countProyectosApi = async (
    idUsuario:number,
    idMateria:number,
    idGrado:number,
    idGrupo:number,
    fechaInicial:string,
    fechaFinal:string,
    estatus:number,
    ): Promise<number> => {
      const apiUrl = getApiUrl("/api/proyecto/count_proyecto");
   
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