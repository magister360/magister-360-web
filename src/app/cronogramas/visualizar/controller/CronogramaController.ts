import { EstatusCronogramaType } from "@/app/estatus/EstatusType";
import {
  createCronogramaApi,
  getCronogramasApi,
} from "../services/CronogramaService";
import { Cronograma } from "@/app/types/cronograma/TypeCronograma";

export const createCronograma = async (
  id: string,

  contenido: string,
  mes: string,
  idUsuario: number | undefined,
  idMateria: number | undefined,
  idGrado: number | undefined,
  idGrupo: number | undefined
): Promise<{ isSave: boolean; message: string }> => {
  if (idMateria === undefined || idMateria <= 0 || idUsuario === undefined) {
    return { isSave: false, message: "No fue posible guardar los datos." };
  }

  return await createCronogramaApi(
    id,

    contenido,
    mes,

    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    EstatusCronogramaType.OK
  )
    .then((response) => {
      if (response) {
        return {
          isSave: true,
          message: "El cronograma se guardó con éxito",
        };
      } else {
        return {
          isSave: false,
          message:
            "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.",
        };
      }
    })
    .catch((error) => {
      return { isSave: false, message: "No fue posible guardar los datos." };
    });
};

export const getCronogramas = async (
  idUsuario: number | undefined,
  idMateria: number | undefined,
  idGrado: number | undefined,
  idGrupo: number | undefined,
  estatus: number | undefined
): Promise<Cronograma[] | null> => {
  if (idMateria === undefined || idMateria <= 0 || idUsuario === undefined) {
    return null;
  }

  return await getCronogramasApi(
    idUsuario,
    idMateria,
    idGrado,
    idGrupo,
    estatus
  );
};
