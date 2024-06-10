import axios from "axios";
import { getApiUrl } from "../../../../API";
import { SourceTextModule } from "vm";

export const getUsers = async () => {
    const apiUrl = getApiUrl('/api/users');

    return await axios
        .get(apiUrl)
        .then(response => response.data)
        .catch(e => {

            return null;
        })
};

export const getCredentials = async (user: string, password: string) => {
   
    const apiUrl = getApiUrl('/api/credentials');

    return await axios
        .post(apiUrl, {
            user,
            password
        })
        .then(response => response.data)
        .catch(e => {

            return null;
        })
};