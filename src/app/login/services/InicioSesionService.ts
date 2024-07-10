import axios from "axios";

export const postInicioSesionApi = async (id: string, idUser: number) => {
  const apiUrl = "/api/inicio_sesion";

  try {
    const response = await axios.post(
      apiUrl,
      { id: id, idUsuario: idUser },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
    }
  } catch (error) {
    throw error;
  }
};
