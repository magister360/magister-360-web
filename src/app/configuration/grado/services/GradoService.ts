import { getApiUrl } from "../../../../../API";
import axios from "axios";


export const createGradoApi = async (
    grado: string,
    estatus: number,
    idUsuario: number
) => {
    const apiUrl = getApiUrl('/api/grado');

    const response = await axios.post(apiUrl, {
        grado,
        estatus,
        idUsuario
    }).then(r => {
        return r.data;
    })
        .catch(e => {
            return null;
        });

    return response;

}

export const getGradosApi = async (
    idUsuario: number,
    estatus: number

) => {
    const apiUrl = getApiUrl('/api/grado');

    const response = await axios.get(apiUrl, {
        params: {
            idUsuario,
            estatus

        }
    }).then(r => {
       
         return r.data;
    })
        .catch(e => {
            return null;
        });
    return response;
}