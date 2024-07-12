import { getApiUrl } from "../../../../API";
import axios from "axios";
import apiSpringBoot from "../../../../APISpringBoot";

export const searchMaterialTituloApi = async (
  idGrado: number,
  idGrupo: number,
  idMateria: number,
  limit: number,
  titulo: string
) => {
  const apiUrl = getApiUrl("/api/material_didactico_titulo");

  const response = await axios
    .get(apiUrl, {
      params: {
        idGrado,
        idGrupo,
        idMateria,
        limit,
        titulo,
      },
    })
    .then((response) => {
      return response.status === 200 ? response.data : null;
    })
    .catch((error) => {
      return null;
    });
  return response;
};

export const searchMaterialTituloEquipoApi = async (
  grado: string,
  grupo: string,
  materia: string,
  mes: string,
  tipo: string,
  txtSearch: string
) => {
  const endpoint = "files_content";
 

  const response = await apiSpringBoot
    .get(endpoint, {
      params: {
        grado,
        grupo,
        materia,
        mes,
        tipo,
        txtSearch,
      },
    })
    .then((response) => {
      return response.status === 200 ? response.data : null;
    })
    .catch((error) => {
      return null;
    });
  return response;
};

export const fechOpenVideoApi = async (path: string) => {
  const endpoint = "video";

  const response = await apiSpringBoot
    .get(endpoint, {
      params: {
        path,
      },
    })
    .then((response) => {
      return response.status === 200 ? response.data : null;
    })
    .catch((error) => {
      return null;
    });
  return response;
};

export const fetchOpenVideoApi = async (path: string): Promise<string> => {
  const endpoint = "video";

  try {
    const response = await apiSpringBoot.get(endpoint, {
      params: { filepath: path },
    });

    if (response.status === 200) {
      return response.data;
    }
    return "";
  } catch (error) {
    console.error("Error fetching video URL:", error);
    return "";
  }
};

export const fetchOpenPdfApi = async (path: string): Promise<string> => {
  const endpoint = "pdf";

  try {
    const response = await apiSpringBoot.get(endpoint, {
      params: { filepath: path },
    });

    if (response.status === 200) {
      return response.data;
    }
    return "";
  } catch (error) {
    console.error("Error fetching video URL:", error);
    return "";
  }
};

export const fetchOpenWordApi = async (path: string): Promise<string> => {
  const endpoint = "word";
  console.log("word");
  try {
    const response = await apiSpringBoot.get(endpoint, {
      params: { filePath: path },
    });

    if (response.status === 200) {
      return response.data;
    }
    return "";
  } catch (error) {
    return "";
  }
};

export const fetchOpenDiapositivasApi = async (
  path: string
): Promise<string> => {
  const endpoint = "word";

  try {
    const response = await apiSpringBoot.get(endpoint, {
      params: { filePath: path },
    });

    if (response.status === 200) {
      return response.data;
    }
    return "";
  } catch (error) {
    return "";
  }
};

export const fetchFilesContentWordApi = async (
  grado: string,
  grupo: string,
  materia: string,
  tipos: string[]
) => {
  const endpoint = "files_content-word";

  const response = await apiSpringBoot
    .get(endpoint, {
      params: {
        grado,
        grupo,
        materia,
        tipos: tipos.join(','),
      },
    })
    .then((response) => {
      return response.status === 200 ? response.data : null;
    })
    .catch((error) => {
      return null;
    });
  return response;
};