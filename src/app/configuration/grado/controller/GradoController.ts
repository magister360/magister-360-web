import Grado from "../page";
import { createGradoApi } from "../services/GradoService";

export const createGrado = async (idUser: number, grado: string, estatus: number) => {
    if (idUser <= 0
        || !grado
        || grado.length < 1
        || grado.length >= 5) {
        return false;
    }
    return createGradoApi(grado, estatus, idUser)
        .then(data => {
            return !!data; 

        });;
}