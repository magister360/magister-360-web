import { FileInfo } from "@/app/types/types";
import {
  searchMaterialTituloApi,
  searchMaterialTituloEquipoApi,
} from "../services/MaterialDidacticoService";

export const fechSearchMaterialTitulo = async (
  idGrado: number,
  idGrupo: number,
  idMateria: number,
  textSearch: string
) => {
  if (
    idGrado === undefined ||
    idGrado <= 0 ||
    idGrupo === undefined ||
    idGrupo <= 0 ||
    idMateria === undefined ||
    idMateria <= 0
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
  grado: string,
  grupo: string,
  materia: string,
  tipo: string,
  txtSearch: string
): Promise<FileInfo[] | null> => {
  if (grado === undefined || grupo === undefined || materia === undefined) {
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
