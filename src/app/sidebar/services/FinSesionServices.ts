import axios from "axios";


export const postFinSesionApi = async (idUsuario: number,idInicioSesion:string) => {
    const apiUrl = "/api/fin_sesion";
    
    try {
      const response = await axios.post(
        apiUrl,
        { idUsuario: idUsuario, idInicioSesion: idInicioSesion },
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
  