import { getYouTubeVideoId } from "@/app/utils/URLYouTube";
import {
  createMaterialDidacticoApi,
  deleteMaterialDidacticoApi,
  updateMaterialDidacticoApi,
} from "../services/DocumentService";
import { v4 as uuidv4 } from "uuid";
import { DocumentTypeValues } from "@/app/utils/DocumentTypeValues";

export const createMaterialDidactico = async (
  tipo: string,
  url: string,
  titulo: string,
  descripcion: string,
  miniatura: string,
  file: string,
  idGrado: number,
  idGrupo: number,
  idMateria: number
) => {
  if (
    idGrado === undefined ||
    idGrado <= 0 ||
    idGrupo === undefined ||
    idGrupo <= 0 ||
    idMateria === undefined ||
    idMateria <= 0 ||
    titulo === undefined ||
    titulo === ""
  ) {
    return false;
  }
  let videoId: string = "";
  if (
    tipo === DocumentTypeValues.YOUTUBE.type &&
    url !== undefined &&
    url !== ""
  ) {
    const vId = getYouTubeVideoId(url);
    videoId = vId === null ? "" : vId;
  } else if (
    tipo === DocumentTypeValues.YOUTUBE.type &&
    (url === undefined || url === "")
  ) {
    return false;
  }

  const id = uuidv4();
  return createMaterialDidacticoApi(
    id,
    tipo,
    videoId,
    titulo,
    descripcion,
    miniatura,
    file,
    idGrado,
    idGrupo,
    idMateria
  );
};

export const updateMaterialDidactico = async (
  id: string,
  tipo: string,
  url: string,
  titulo: string,
  descripcion: string,
  miniatura: string,
  file: string
) => {
  if (titulo === undefined || titulo === "") {
    return false;
  }
  let videoId: string = "";
  if (
    tipo === DocumentTypeValues.YOUTUBE.type &&
    url !== undefined &&
    url !== ""
  ) {
    const vId = getYouTubeVideoId(url);
    videoId = vId === null ? "" : vId;
  } else if (
    tipo === DocumentTypeValues.YOUTUBE.type &&
    (url === undefined || url === "")
  ) {
    return false;
  }

  return updateMaterialDidacticoApi(
    id,
    tipo,
    videoId,
    titulo,
    descripcion,
    miniatura,
    file
  );
};

export const deleteMaterialDidactico = async (id: string) => {
  return deleteMaterialDidacticoApi(id);
};
