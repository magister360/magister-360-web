import { Licencia } from "@/app/types/TypesLicencia";
import { encryptString } from "../../../../security/Security";
import { getCountUsersApi, postUserApi } from "../services/usersService";

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


