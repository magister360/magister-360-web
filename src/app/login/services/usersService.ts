import axios from "axios";
import { getApiUrl } from "../../../../API";
import { decryptString } from "../../../../security/Security";
import { ResponseCredentials } from "./ResponseCredentials";
import { loadSessionFromLocalStorage, saveSessionCookies } from "@/app/sesions/SesionCookies";


export const getUsers = async () => {
    const apiUrl = getApiUrl('/api/users');

    return await axios
        .get(apiUrl)
        .then(response => {
            response.data;

        }
        )
        .catch(e => {

            return null;
        })
};

export const getCredentials = async (userName: string, encryptedPassword: string) => {
    if (userName.length === 0 || encryptedPassword.length === 0) {
        return false;
    }
    const apiUrl = getApiUrl('/api/credentials');

    const response = await axios.post(apiUrl, {
        userName
    }).then(r => {
        return r.data;
    })
        .catch(e => {
            return null;
        });
    const decryptStringInput = decryptString(encryptedPassword);

    const responseCredentials = ResponseCredentials.fromStringToJson(response);
    const decryptStringBD = decryptString(responseCredentials.password === null ? '' : responseCredentials.password);
    const compareAprove: number = decryptStringInput.localeCompare(decryptStringBD);
    if (responseCredentials !== null
        && compareAprove === 0) {
        saveSessionCookies(responseCredentials.id, responseCredentials.userName);
    }


    return compareAprove === 0;

};