import { Licencia } from "@/app/types/TypesLicencia";
import { encryptString } from "../../security/Security";
import {
  getCountUsersApi,
  getUltimoUsuarioApi,
  getUserLogeadoApi,
  postUserApi,
} from "../services/usersService";
import { LastUser, UserLogeado } from "@/app/types/TypesLoginRecords";

const DAYS_PRUEBA = 30;

export const getCountUsers = async () => {
  const countUsers = await getCountUsersApi();

  if (countUsers === 0) {
    const fechaActual = new Date();
    const fechaActivacion: Date = fechaActual;
    const fechaVencimiento: Date = new Date(fechaActual.getTime());
    fechaVencimiento.setDate(fechaVencimiento.getDate() + DAYS_PRUEBA);

    const licenciaActivacion: Licencia = {
      fechaActivacion,
      fechaVencimiento,
      idUsuario: -1,
      tipo: "prueba",
    };

    const licenciaEnJSON = JSON.stringify(licenciaActivacion);
    const encriptLicenciaJSON = encryptString(licenciaEnJSON);
    const password = "123";
    const encriptPassword = encryptString(password);
    const userData = {
      user: "admin",
      password: encriptPassword,
      correo: "",
      foto: "",
      cls: encriptLicenciaJSON,
      estatus: 0,
    };

    await postUserApi(userData);
  }
};

export const getUltimoUser = async (): Promise<LastUser | null> => {
  return getUltimoUsuarioApi();
};

export const getUserLogeado = async (
  id: number | undefined
): Promise<UserLogeado | null> => {
  if (id !== undefined) {
    return getUserLogeadoApi(id);
  }
  return null;
};
