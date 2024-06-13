
import { createMateriaApi, getMateriasApi } from "../services/MateriaService";

export const createMateria = async (idUser: number, materia: string, estatus: number) => {
    if (idUser <= 0
        || !materia
        || materia.length < 1
        || materia.length >= 60) {
        return false;
    }
    return createMateriaApi(materia, estatus, idUser)
        .then(data => {
            return !!data;

        });;
}

export const getMaterias = async (idUser: number, estatus: number) => {
    if (idUser <= 0 || estatus < 0 || estatus >= 2) {
        return null;
    }
    const response = getMateriasApi(idUser, estatus)
        .then(data => {
            return data;

        });;

    return response;
}