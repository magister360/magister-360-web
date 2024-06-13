
import { createGradoApi, getGradosApi } from "../services/GradoService";

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

export const getGrados = async (idUser: number, estatus: number) => {
    if (idUser <= 0) {
        return null;
    }
    const response = getGradosApi(idUser, estatus)
        .then(data => {
            return data;

        });;

    return response;
}