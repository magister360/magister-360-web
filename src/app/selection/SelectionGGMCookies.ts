import { decryptString, encryptString } from "../../../security/Security";
import { SelectionGGM } from "./SelectionGGM";

const CLAVE_SELECTION_APP = 'selectionGGM4545dYU34515za';

export function saveSelectionGGMCookies(
    idGrado: number,
    grado: string,
    idGrupo: number,
    grupo: string,
    idMateria: number,
    materia: string
): void {
    const sesionLocalStorage = loadSelectionGGMFromLocalStorage();
    if (sesionLocalStorage) {
        removeSessionFromLocalStorage();
    }
    const selectionGGM = new SelectionGGM(idGrado, grado, idGrupo, grupo, idMateria, materia);
    const jsonSelectionGGM = selectionGGM.toJson();
    const encryptText = encryptString(jsonSelectionGGM);

    window.localStorage.setItem(CLAVE_SELECTION_APP, encryptText);
}

export function removeSessionFromLocalStorage(): void {
    window.localStorage.removeItem(CLAVE_SELECTION_APP);
}

export function loadSelectionGGMFromLocalStorage(): SelectionGGM | null {

    const encryptText = window.localStorage.getItem(CLAVE_SELECTION_APP);
    if (encryptText !== null) {
        const decrypt = decryptString(encryptText === null ? '' : encryptText);
        const selectionGGM = SelectionGGM.fromStringToJson(decrypt);
        return selectionGGM;
    }
    return null;
}

