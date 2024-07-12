import { FileInfo } from "@/app/types/types";
import {
  fetchFilesContentWordApi,
  fetchOpenDiapositivasApi,
  fetchOpenPdfApi,
  fetchOpenVideoApi,
  fetchOpenWordApi,
  searchMaterialTituloApi,
  searchMaterialTituloEquipoApi,
} from "../services/MaterialDidacticoService";

export const fechSearchMaterialTitulo = async (
  idGrado: number | undefined,
  idGrupo: number | undefined,
  idMateria: number | undefined,
  textSearch: string | undefined
) => {
  if (
    idGrado === undefined ||
    idGrado <= 0 ||
    idGrupo === undefined ||
    idGrupo <= 0 ||
    idMateria === undefined ||
    idMateria <= 0 ||
    textSearch === undefined
  ) {
    return null;
  }

  const limit = 10;
  return searchMaterialTituloApi(
    idGrado,
    idGrupo,
    idMateria,
    limit,
    textSearch
  );
};

export const fechSearchMaterialTituloEquipo = async (
  grado: string | undefined,
  grupo: string | undefined,
  materia: string | undefined,
  tipo: string,
  txtSearch: string | undefined
): Promise<FileInfo[] | null> => {
  if (
    grado === undefined ||
    grupo === undefined ||
    materia === undefined ||
    txtSearch === undefined
  ) {
    return null;
  }
  const currentMonth = getCurrentMonth();
  return searchMaterialTituloEquipoApi(
    grado,
    grupo,
    materia,
    currentMonth,
    tipo,
    txtSearch
  );
};

const getCurrentMonth = (): string => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const currentDate = new Date();
  const currentMonth = months[currentDate.getMonth()];

  return currentMonth;
};

export const fetchOpenVideo = async (path: string): Promise<string> => {
  if (path === undefined) {
    return "";
  }
  return fetchOpenVideoApi(path);
};

export const fetchOpenPdf = async (path: string): Promise<string> => {
  if (path === undefined) {
    return "";
  }
  return fetchOpenPdfApi(path);
};

export const fetchOpenWord = async (path: string): Promise<string> => {
  if (path === undefined) {
    return "";
  }
  return fetchOpenWordApi(path);
};

export const fetchOpenDiapositivas = async (path: string): Promise<string> => {
  if (path === undefined) {
    return "";
  }
  return fetchOpenDiapositivasApi(path);
};

export const fetchFilesContentWord = async (
  grado: string | undefined,
  grupo: string | undefined,
  materia: string | undefined,
  tipos: string[]
): Promise<FileInfo[] | null> => {
  if (grado === undefined || grupo === undefined || materia === undefined) {
    return null;
  }
  return fetchFilesContentWordApi(grado, grupo, materia, tipos);
};
