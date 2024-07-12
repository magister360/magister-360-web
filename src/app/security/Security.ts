
import CryptoJS from 'crypto-js';
import { config } from '../../../config';

export function encryptString(mensaje: string): string {
    return CryptoJS.AES.encrypt(mensaje, config.getSecretKey()).toString();
}

export function decryptString(mensajeEncriptado: string): string {
    if (mensajeEncriptado.length === 0) {
        return "";
    }
    const bytes = CryptoJS.AES.decrypt(mensajeEncriptado, config.getSecretKey());
    return bytes.toString(CryptoJS.enc.Utf8);
}