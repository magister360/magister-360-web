import { authProfesorApi } from "../service/AuthService";

export const authProfesor = async (
  usuarioProfesor: string,
  password: string
): Promise<boolean> => {
  try {
    await authProfesorApi(usuarioProfesor,password);
    return true;
  } catch (error) {
    return false;
  }
};
