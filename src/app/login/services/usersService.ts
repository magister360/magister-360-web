import axios from "axios";
import { getApiUrl } from "../../../../API";

export const getUsers = async () => {
    const apiUrl = getApiUrl('/api/users');

    return await axios
        .get(apiUrl)
        .then(response => response.data)
        .catch(e => {
       
            return null;
        })
};