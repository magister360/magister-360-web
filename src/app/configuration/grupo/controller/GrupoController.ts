import { createGrupoApi, getGruposApi, removeGrupoApi, updateGrupoApi } from "../services/GrupoService";

export const createGrupo = async (idUser: number, grupo: string, estatus: number) => {
    if (idUser <= 0
        || !grupo
        || grupo.length < 1
        || grupo.length >= 5) {
        return false;
    }
    return createGrupoApi(grupo, estatus, idUser)
        .then(data => {
            return !!data;

        });;
}

export const removeGrupo = async (id: number, estatus: number) => {
    if (id <= 0) {
        return false;
    }
    return removeGrupoApi(id, estatus)
        .then(data => {
            return !!data;

        });;
}

export const updateGrupo = async (id: number, grupo: string) => {
    if (id <= 0) {
        return false;
    }
    return updateGrupoApi(id, grupo)
        .then(data => {
            return !!data;

        });
}


export const getGrupos = async (idUser: number, estatus: number) => {
    if (idUser <= 0) {
        return null;
    }
    const response = getGruposApi(idUser, estatus)
        .then(data => {
            return data;

        });;

    return response;
}