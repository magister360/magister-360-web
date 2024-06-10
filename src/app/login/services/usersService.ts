import axios from "axios";
import { getApiUrl } from "../../../../API";
import { decryptString } from "../../../../security/Security";


export const getUsers = async () => {
    const apiUrl = getApiUrl('/api/users');

    return await axios
        .get(apiUrl)
        .then(response => {
            response.data;
            console.log('users response.data ' + response.data)
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

    const decryptStringBD = decryptString(response === null ? '' : response);
    const compareAprove: number = decryptStringInput.localeCompare(decryptStringBD);
    return compareAprove === 0;
};