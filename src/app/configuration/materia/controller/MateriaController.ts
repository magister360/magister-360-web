
import { createMateriaApi, getMateriasApi, removeMateriaApi, updateMateriaApi } from "../services/MateriaService";

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

export const removeMateria = async (id: number, estatus: number) => {
    if (id <= 0) {
        return false;
    }
    return removeMateriaApi(id, estatus)
        .then(data => {
            return !!data;

        });;
}

export const updateMateria = async (id: number, materia: string) => {
    if (id <= 0) {
        return false;
    }
    return updateMateriaApi(id, materia)
        .then(data => {
            return !!data;

        });
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