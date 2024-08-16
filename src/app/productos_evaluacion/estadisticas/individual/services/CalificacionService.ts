import axios from "axios";
import { getApiUrl } from "../../../../../../API";
import { TypeParticipacionCalificacion } from "@/app/types/participacion/TypeParticipacion";
import { TypeTareaCalificacion } from "@/app/types/tarea/TypeTarea";
import { TypeProyectoCalificacion } from "@/app/types/proyecto/TypeProyecto";
import { TypeExamenCalificacion } from "@/app/types/examen/TypeExamen";
import { TypePuntoExtraCalificacion } from "@/app/types/puntos_extra/TypePuntoExtra";

export const calificacionParticipacionApi = async (
  idUsuario: number,
  idMateria: number,
  idGrado: number,
  idGrupo: number,
  fechaInicial: string,
  fechaFinal: string,
  estatus: number,
  idAlumno: string
): Promise<TypeParticipacionCalificacion[]> => {
  const apiUrl = getApiUrl("/api/participacion/get_individual");

  const response = await axios
    .get(apiUrl, {
      params: {
        idGrado,
        idGrupo,
        idUsuario,
        idMateria,
        fechaInicial,
        fechaFinal,
        estatus,
        idAlumno,
      },
    })
    .then((r) => {
      if (r.status === 200) {
        return r.data;
      } else {
        return [];
      }
    })
    .catch((e) => {
      return null;
    });
  return response;
};

export const getFechasParticipacionApi = async (
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idUsuario: number,
  idMateria: number,
  fechaInicial: Date | null,
  fechaFinal: Date | null,
  estatus: number
): Promise<string[]> => {
  const apiUrl = getApiUrl("/api/fechas_participacion");

  const response = await axios
    .get(apiUrl, {
      params: {
        idGrado,
        idGrupo,
        idUsuario,
        idMateria,
        fechaInicial,
        fechaFinal,
        estatus,
      },
    })
    .then((r) => {
      if (r.status === 200) {
        return r.data;
      } else {
        return null;
      }
    })
    .catch((e) => {
      return null;
    });
  return response;
};

export const calificacionTareaApi = async (
  idUsuario: number,
  idMateria: number,
  idGrado: number,
  idGrupo: number,
  fechaInicial: string,
  fechaFinal: string,
  estatus: number,
  idAlumno: string
): Promise<TypeTareaCalificacion[]> => {
  const apiUrl = getApiUrl("/api/tarea/get_individual");

  const response = await axios
    .get(apiUrl, {
      params: {
        idGrado,
        idGrupo,
        idUsuario,
        idMateria,
        fechaInicial,
        fechaFinal,
        estatus,
        idAlumno,
      },
    })
    .then((r) => {
      if (r.status === 200) {
        return r.data;
      } else {
        return [];
      }
    })
    .catch((e) => {
      return null;
    });
  return response;
};

export const getFechasTareaApi = async (
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idUsuario: number,
  idMateria: number,
  fechaInicial: Date | null,
  fechaFinal: Date | null,
  estatus: number
): Promise<string[]> => {
  const apiUrl = getApiUrl("/api/fechas_tarea");

  const response = await axios
    .get(apiUrl, {
      params: {
        idGrado,
        idGrupo,
        idUsuario,
        idMateria,
        fechaInicial,
        fechaFinal,
        estatus,
      },
    })
    .then((r) => {
      if (r.status === 200) {
        return r.data;
      } else {
        return null;
      }
    })
    .catch((e) => {
      return null;
    });
  return response;
};

export const calificacionProyectoApi = async (
  idUsuario: number,
  idMateria: number,
  idGrado: number,
  idGrupo: number,
  fechaInicial: string,
  fechaFinal: string,
  estatus: number,
  idAlumno: string
): Promise<TypeProyectoCalificacion[]> => {
  const apiUrl = getApiUrl("/api/proyecto/get_individual");

  const response = await axios
    .get(apiUrl, {
      params: {
        idGrado,
        idGrupo,
        idUsuario,
        idMateria,
        fechaInicial,
        fechaFinal,
        estatus,
        idAlumno,
      },
    })
    .then((r) => {
      if (r.status === 200) {
        return r.data;
      } else {
        return [];
      }
    })
    .catch((e) => {
      return null;
    });
  return response;
};

export const calificacionExamenApi = async (
  idUsuario: number,
  idMateria: number,
  idGrado: number,
  idGrupo: number,
  noPeriodo: number,
  estatus: number,
  idAlumno: string
): Promise<TypeExamenCalificacion[]> => {
  const apiUrl = getApiUrl("/api/examen/get_individual");

  const response = await axios
    .get(apiUrl, {
      params: {
        idGrado,
        idGrupo,
        idUsuario,
        idMateria,
        noPeriodo,
        estatus,
        idAlumno,
      },
    })
    .then((r) => {
      if (r.status === 200) {
        return r.data;
      } else {
        return [];
      }
    })
    .catch((e) => {
      return null;
    });
  return response;
};

export const calificacionPuntoExtraApi = async (
  idUsuario: number,
  idMateria: number,
  idGrado: number,
  idGrupo: number,
  fechaInicial: string,
  fechaFinal: string,
  estatus: number,
  idAlumno: string
): Promise<TypePuntoExtraCalificacion[]> => {
  const apiUrl = getApiUrl("/api/punto_extra/get_individual");

  const response = await axios
    .get(apiUrl, {
      params: {
        idGrado,
        idGrupo,
        idUsuario,
        idMateria,
        fechaInicial,
        fechaFinal,
        estatus,
        idAlumno,
      },
    })
    .then((r) => {
      if (r.status === 200) {
        return r.data;
      } else {
        return [];
      }
    })
    .catch((e) => {
      return null;
    });
  return response;
};