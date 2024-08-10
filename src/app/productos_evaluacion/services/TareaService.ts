import { TypeTareaCalificacion, TypeTareaFecha } from "@/app/types/tarea/TypeTarea";
import { getApiUrl } from "../../../../API";
import axios from "axios";

export const getTareasApi = async (
  idUsuario: number,
  idMateria: number,
  idGrado: number,
  idGrupo: number,
  fechaInicial: string,
  fechaFinal: string,
  estatus: number
): Promise<TypeTareaCalificacion[] | null> => {
  const apiUrl = getApiUrl("/api/tarea/get_tareas");
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
        return r.data as TypeTareaCalificacion[];
      } else {
        return null;
      }
    })
    .catch((e) => {
      console.log(e);
      return null;
    });
  return response;
};

export const countTareasApi = async (
  idUsuario: number,
  idMateria: number,
  idGrado: number,
  idGrupo: number,
  fechaInicial: string,
  fechaFinal: string,
  estatus: number
): Promise<number> => {
  const apiUrl = getApiUrl("/api/tarea/count_tarea");

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
        return r.data;
      } else {
        return 0;
      }
    })
    .catch((e) => {
      console.log(e);
      return 0;
    });
  return response;
};
