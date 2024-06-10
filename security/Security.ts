
import CryptoJS from 'crypto-js';

const secretKey = '11{.~{:g{dn^))&2Mm,7Z;t!&';



export function encryptString(mensaje: string): string {
    return CryptoJS.AES.encrypt(mensaje, secretKey).toString();
}

export function decryptString(mensajeEncriptado: string): string {
    if (mensajeEncriptado.length === 0) {
        return "";
    }
    const bytes = CryptoJS.AES.decrypt(mensajeEncriptado, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}