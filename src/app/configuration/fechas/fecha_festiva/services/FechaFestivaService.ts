import axios from "axios";
import { getApiUrl } from "../../../../../../API";

export const createFechaFestivaApi = async (
    fecha: string ,
    actividad: string ,
  
    idUsuario: number 
  ): Promise<boolean> => {
    const apiUrl = getApiUrl("/api/fecha_festiva/create");
  
    const response = await axios
      .post(
        apiUrl,
        {
          fecha,
          actividad,
  
          idUsuario,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        return response.status === 200;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
    return response;
  };