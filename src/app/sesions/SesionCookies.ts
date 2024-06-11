import { decryptString, encryptString } from "../../../security/Security";
import { Sesion } from "./Sesion";
const CLAVE_LOGGED_APP = 'loggedKhs4SddQWRPOOIcxc654g';


export function saveSessionCookies(userId: number, userName: string): void {
    const sesionLocalStorage = loadSessionFromLocalStorage();
    if (sesionLocalStorage) {
        removeSessionFromLocalStorage();
    }
    const sesion = new Sesion(userId, userName);
    const jsonSesion = sesion.toJson();
    const encryptText = encryptString(jsonSesion);

    window.localStorage.setItem(CLAVE_LOGGED_APP, encryptText);
}

export function removeSessionFromLocalStorage(): void {
    window.localStorage.removeItem(CLAVE_LOGGED_APP);
}


export function loadSessionFromLocalStorage(): Sesion | null {

    const encryptText = window.localStorage.getItem(CLAVE_LOGGED_APP);
    if (encryptText !== null) {
        const decrypt = decryptString(encryptText === null ? '' : encryptText);
        const sesion = Sesion.fromStringToJson(decrypt);
        return sesion;
    }
    return null;
}