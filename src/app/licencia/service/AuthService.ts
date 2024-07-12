import apiSpringBoot from "../../../../APISpringBoot";

interface LoginRequest {
  usuarioProfesor: string;
  password: string;
}

export const authProfesorApi = async (
  usuarioProfesor: string,
  password: string
): Promise<string> => {
  const endpoint = "api/auth";
  console.log('usuarioProfesor '+usuarioProfesor)

  const loginRequest: LoginRequest = {
    usuarioProfesor,
    password,
  };

  try {
    const response = await apiSpringBoot.post(endpoint, loginRequest);

    if (response.status === 200) {
      return response.data;
    }
    return "";
  } catch (error) {
    return "";
  }
};
