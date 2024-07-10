import { postFinSesionApi } from "../services/FinSesionServices";

export const createFinSesion = async (
  idUsuario: number | undefined,
  idInicioSesion: string | undefined
) => {
  if (idUsuario !== undefined && idInicioSesion !== undefined) {
    await postFinSesionApi(idUsuario, idInicioSesion);
  }
};
