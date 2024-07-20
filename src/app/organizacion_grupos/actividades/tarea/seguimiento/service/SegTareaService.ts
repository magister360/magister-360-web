import axios from "axios";
import { getApiUrl } from "../../../../../../../API";

export const getFechasTareaApi = async (
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idUsuario: number,
  idMateria: number,
  fechaInicial: Date | null,
  fechaFinal: Date | null,
  estatus: number
) => {
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

export const getFechasTareaAlumnoApi = async (
  idMateria: number,
  idUsuario: number,
  idAlumno: string,
  fechaInicial: Date | null,
  fechaFinal: Date | null,
  estatus: number
) => {
  const apiUrl = getApiUrl("/api/fecha_tarea_alumno");

  const response = await axios
    .get(apiUrl, {
      params: {
        idUsuario,
        idMateria,
        idAlumno,
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

export const getAlumnosTareaApi = async (
  idUsuario: number,
  estatus: number,
  idGrado: number,
  idGrupo: number,
  busqueda: string,
  idMateria: number
) => {
  const apiUrl = getApiUrl("/api/alumno_tarea");

  const response = await axios
    .get(apiUrl, {
      params: {
        idUsuario,
        estatus,
        idGrado,
        idGrupo,
        busqueda,
        idMateria,
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

export const updateEstatusTareaApi = async (
  id: string,
  estatus: number
) => {
  const apiUrl = getApiUrl("/api/tarea");

  const response = await axios
    .patch(
      apiUrl,
      {
        id: id,
        estatus: estatus
      }
    )
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


