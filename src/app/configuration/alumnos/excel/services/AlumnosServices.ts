import axios from "axios";
import { getApiUrl } from "../../../../../../API";
import { ItemAlumno } from "@/app/types/types";

export const createAlumnosApi = async (alumnos: ItemAlumno[]) => {
  const apiUrl = getApiUrl("/api/alumnos");

  const response = await axios
    .post(
      apiUrl,
      {
        alumnos,
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
      console.error(error);
      return false;
    });
  return response;
};
