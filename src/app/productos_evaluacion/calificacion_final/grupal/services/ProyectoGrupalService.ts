import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";
import axios from "axios";
import { getApiUrl } from "../../../../../../API";

export const getProyectosGrupalApi = async (
  idUsuario: number,
  idMateria: number,
  idGrado: number,
  idGrupo: number,
  fechaInicial: string[],
  fechaFinal: string[],
  estatus: number
): Promise<TypeParticipacionCalificacion[] | null> => {
  const apiUrl = getApiUrl("/api/proyecto/get_proyecto_final");

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
        return r.data as TypeParticipacionCalificacion[];
      } else {
        return null;
      }
    })
    .catch((e) => {
      return null;
    });
  return response;
};
export const countProyectosGrupalApi = async (
  idUsuario: number,
  idMateria: number,
  idGrado: number,
  idGrupo: number,
  fechaInicial: string[],
  fechaFinal: string[],
  estatus: number
): Promise<number> => {
  const apiUrl = getApiUrl("/api/proyecto/count_proyecto_grupal");

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
      return 0;
    });
  return response;
};
