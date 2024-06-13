import { getApiUrl } from "../../../../../API";
import axios from "axios";


export const createMateriaApi = async (
    materia: string,
    estatus: number,
    idUsuario: number
) => {
    const apiUrl = getApiUrl('/api/materia');

    const response = await axios.post(apiUrl, {
        materia,
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


export const getMateriasApi = async (
    idUsuario: number,
    estatus: number

) => {
    const apiUrl = getApiUrl('/api/materia');

    const response = await axios.get(apiUrl, {
        params: {
            idUsuario,
            estatus

        }
    }).then(r => {
        //console.log("Respuesta de datamateria service  " + r.data)
        return r.data;
    })
        .catch(e => {
            return null;
        });
    return response;
}